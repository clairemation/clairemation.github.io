startUp()

function startUp()
{
  var inject = createLazyDependencyInject(getDependencyList())
  var {controller} = inject("controller")
  controller.start()
}


function getController(inject)
{
  var {appDisplayLogic, controlHelpers, params} = inject("appDisplayLogic", "controlHelpers", "params")

  function start()
  {
    const display = appDisplayLogic.getInstance()

    const page = parseInt(params.page)
    controlHelpers.validatePageIndex(page)
    
    const pageStep = controlHelpers.getPageStepValue(display)
    
    display.setViewMode(pageStep == 1 ? display.viewModes.SINGLE_PAGE : display.viewModes.SPREAD)
    
    controlHelpers.initNavUi(display, page, pageStep)
    
    controlHelpers.initSliderUi(display, page, pageStep)

    controlHelpers.displayPages(display, page, pageStep)
  }

  return {start}
}


function getControlHelpers(inject)
{
  var {bookLogic, restart, userPrefs} = inject("bookLogic", "restart", "userPrefs")

  const controlHelpers = {

    validatePageIndex: (page) =>
    {
      if (!page)
      {
        restart({page: bookLogic.pageMin})
      }
      if (page < bookLogic.pageMin)
      {
        restart({page: bookLogic.pageMax})
      }
      if (page > bookLogic.pageMax)
      {
        restart({page: bookLogic.pageMax})
      }
    },

    getPageStepValue: display =>
    {
      var savedPageStep = userPrefs.get("pageStep")
      switch (savedPageStep)
      {
        case ("1"):
          return 1
        case ("2"):
          return 2
        default:
          const pageStep = controlHelpers.calculateBestFittingPageStepForDisplay(display)
          userPrefs.set("pageStep", pageStep)
          return pageStep
      }
    },

    calculateBestFittingPageStepForDisplay: display =>
    {
      var spreadAspectRatio = bookLogic.pageWidth * 2 / bookLogic.pageHeight
      var displayAspectRatio = display.getDisplayAspectRatio()
      return displayAspectRatio >= spreadAspectRatio ? 2 : 1
    },

    initNavUi: (display, page, pageStep) =>
    {
      display.setButtonLogic({
        next: () => controlHelpers.goToPage(display, page + pageStep),
        prev: () => controlHelpers.goToPage(display, page - pageStep),
        singlePage: () => controlHelpers.setPageStep(display, page, 1),
        spread: () => controlHelpers.setPageStep(display, page, 2),
      })
    },

    initSliderUi: (display, page, pageStep) =>
    {
      display.setSliderValues({
        min: bookLogic.pageMin / pageStep,
        max: bookLogic.pageMax / pageStep,
        value: page / pageStep
      })
      display.setSliderOutput(bookLogic.getPageRangeString(page, pageStep))
      display.setOnMoveSlider(rawValue => display.setSliderOutput(bookLogic.getPageRangeString(rawValue * pageStep, pageStep)))
      display.setOnFinishedMovingSlider(rawValue => controlHelpers.goToPage(display, rawValue * pageStep))
    },

    displayPages: (display, page, pageStep) =>
    {
      var pageUrls = bookLogic.getPageUrls(page, pageStep)
      display.loadPages(pageUrls).then(pages => display.fadeInDisplay())
    },

    goToPage: (display, index) =>
    {
      display.fadeOutDisplay().then(() => restart({page: index}))
    },

    setPageStep: (display, page, newPageStep) =>
    {
      userPrefs.set("pageStep", newPageStep)
      display.fadeOutDisplay().then(() => restart({page}))
    }
  }

  return controlHelpers
}


function getRestartFunc()
{
	return function restartWithNewUrlParams(paramsObj)
	{
	  var paramString = "?" + Object.entries(paramsObj).map(keyValuePair => `${keyValuePair[0]}=${keyValuePair[1]}`).join("&")
	  window.location.href = paramString
	}
}


function getUrlParams()
{
	var params = {}
	var urlParams = new URLSearchParams(window.location.search)
	urlParams.forEach((v, k) => params[k] = v)
	return params
}


function getUserPrefs()
{
	return {
		get: key => localStorage.getItem(key),
		set: (key, value) => localStorage.setItem(key, value)
	}
}


function getBookData()
{
	return {
	  title: "Mementos: A Star Wars Fancomic",
	  pageMin: 1,
	  pageMax: 41,
	  pageWidth: 1350,
	  pageHeight: 1800,
	  isComplete: false,
	  pageOneIsOnRightSide: true,
	  convertIndexToImgUrl: index => `./jpg/${index.toString().padStart(2, "0")}.jpg`,
	  convertIndexToDisplayedPageNumber: num => num <= 4 ? (["", "i", "ii", "cover", "note"])[num] : (num - 4).toString()
	}
}


function getBookLogic(inject)
{
  var {bookData} = inject("bookData")
  
  var {pageMin, pageMax, pageWidth, pageHeight} = bookData
  var page2position = bookData.pageOneIsOnRightSide ? 0 : 1

  const pageIsWithinBook = page => page >= pageMin && page <= pageMax

  var start
  const getPageRange = index => [start = index - ((index + page2position) % 2), start + 1]
  
  const getSinglePage = index => [index]
  
  const getPageSpread = index => getPageRange(index).filter(pageIsWithinBook)
   
  const getPageRangeArray = (page, pageStep) => [getSinglePage, getPageSpread][pageStep-1](page)

  return {
    getPageRangeArray,
    pageMin,
    pageMax,
    pageWidth,
    pageHeight,
    getPageUrls: (page, pageStep) => getPageRangeArray(page, pageStep).map(bookData.convertIndexToImgUrl),
    getPageRangeString: (page, pageStep) => getPageRangeArray(page, pageStep).map(bookData.convertIndexToDisplayedPageNumber).join("–")
  }
}


function getDisplayHelpers(inject)
{
  var {eventFunctions} = inject("eventFunctions")

  const displayHelpers = {

    getAppElements: datasetName => 
    {
      const datatag = "data-" + datasetName.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
      var htmlElements = document.querySelectorAll(`[${datatag}]`)
      var htmlElementsArray = Array.from(htmlElements)
      var elementsObj = htmlElementsArray.reduce((obj, e) => (obj[e.dataset[datasetName]] = e, obj), {})
      return elementsObj
    },

    setValues: Object.assign,

    setText: (html, text) =>
    {
      html.innerHTML = text
    },

    animateClassTransition: (html, states) =>
    {
      html.classList.remove(states.from)
      return displayHelpers.startAnimationPromise(html, states.interim).then(() =>
      {
        html.classList.remove(states.interim)
        html.classList.add(states.to)
        return Promise.resolve()
      })
    },

    getAspectRatio: html =>
    {
      return html.clientWidth / html.clientHeight
    },

    startAnimationPromise: (html, className) =>
    {
      return new Promise(resolve => {
        eventFunctions.setOneTimeEventCallback(html, "animationend", () => 
        {
          resolve(html)
        })
        html.classList.add(className)
      })
    },

    setOneOfTwoClasses: (html, condition, classIfTrue, classIfFalse) =>
    {
      html.classList.remove(classIfTrue, classIfFalse)
      html.classList.add(condition ? classIfTrue : classIfFalse)
    },

    loadElements: (html, urls, createElementPromise) =>
    {
      var loadPromises = urls.map(url => createElementPromise(url))
      return new Promise(resolve => 
      {
        Promise.all(loadPromises).then(children =>
        {
          children.forEach(child => html.appendChild(child))
          resolve(children)
        })
      })
    },

    addOnClick: (html, func) =>
    {
      html.addEventListener("click", e =>
      {
        e.preventDefault()
        func(e)
      })
    },

    addOnPointerUp: (html, func) =>
    {
      var callback = () => func(html.value)
      html.onmouseup = callback
      html.ontouchstart = eventFunctions.setOneTimeEventCallback(html, "touchend", callback)
    },

    addOnChange: (html, func) => html.oninput = () => func(html.value)
  }

  return displayHelpers
}


function getAppDisplayLogic(inject)
{
	var {displayHelpers, pageDisplayLogic, consts} = inject("displayHelpers", "pageDisplayLogic", "consts")

	function getInstance()
	{
		const elements = displayHelpers.getAppElements(consts.DATASET)
		const {appContainer, displayContainer, pageContainer, slider, sliderOutput, nextButton, prevButton, singlePageButton, spreadButton} = elements

		const appDisplayLogic = {
			viewModes: {
				SINGLE_PAGE: 0,
				SPREAD: 1
			},
			setViewMode: mode => 
			{
				spreadButton.classList.add(["enabled-button", "disabled-button"][mode])
				singlePageButton.classList.add(["disabled-button", "enabled-button"][mode])
			},
			setButtonLogic: buttonLogic =>
			{
				displayHelpers.addOnClick(nextButton, buttonLogic.next)
				displayHelpers.addOnClick(prevButton, buttonLogic.prev)
				displayHelpers.addOnClick(singlePageButton, buttonLogic.singlePage)
				displayHelpers.addOnClick(spreadButton, buttonLogic.spread)
			},
			getDisplayAspectRatio: () => displayHelpers.getAspectRatio(displayContainer),
			fadeInDisplay: () => displayHelpers.startAnimationPromise(displayContainer, "fade-in"),
		    fadeOutDisplay: () => displayHelpers.startAnimationPromise(displayContainer, "fade-out"),
		    setSliderValues: values => displayHelpers.setValues(slider, values),
		    setSliderOutput: text => displayHelpers.setText(sliderOutput, text),
		    setOnMoveSlider: func => displayHelpers.addOnChange(slider, value => func(value)),
		    setOnFinishedMovingSlider: func => displayHelpers.addOnPointerUp(slider, value => func(value)),
		    loadPages: urls => pageDisplayLogic.loadPages(pageContainer, urls).then(pages => 
    	    {
    	      const contentAspectRatio = pageDisplayLogic.getPageSpreadContentAspectRatio(pages)
    	      const autoscalePageContainer = pageDisplayLogic.createOptimizedAutoscalePageContainerCallback(displayContainer, contentAspectRatio)
    	      autoscalePageContainer()
    	      appContainer.addEventListener("resizeapp", autoscalePageContainer)
    	    })
		}

		return appDisplayLogic
	}

	return {getInstance}
}


function getPageDisplayLogic(inject)
{
	var {displayHelpers, eventFunctions} = inject("displayHelpers", "eventFunctions")

	const pageDisplayFunctions = {

		loadPages: (html, urls) => displayHelpers.loadElements(html, urls, pageDisplayFunctions.createPagePromise),

		createPagePromise: url =>
		{
		  return new Promise(resolve => {
		    const div = document.createElement("div")
		    const img = document.createElement("img")
		    div.appendChild(img)
		    div.setAttribute("class", "page")
		    img.setAttribute("class", "page")
		    img.addEventListener("load", () => resolve(div))
		    img.src = url
		  })
		},

		getPageSpreadContentAspectRatio: pages => {
			const images = pages.reduce((arr, page) => arr.concat(Array.from(page.getElementsByTagName("img"))), [])
			const totalWidth = images.reduce((totalWidth, img) => totalWidth + img.naturalWidth, 0)
			const height = images.reduce((maxImgHeight, img) => img.naturalHeight > maxImgHeight ? img.naturalHeight : maxImgHeight, 0)
			return totalWidth / height
		},

		createOptimizedAutoscalePageContainerCallback: (html, contentAspectRatio) =>
		{
			const isContainerWiderThanContent = () => displayHelpers.getAspectRatio(html) >= contentAspectRatio
			const setScalingType = containerIsWiderThanContent => displayHelpers.setOneOfTwoClasses(html, containerIsWiderThanContent, "scale-to-height", "scale-to-width")
			const updateScalingIfRatiosHaveChanged = eventFunctions.makeFunctionThatExecutesOnConditionChange(setScalingType, isContainerWiderThanContent)
			const optimizedUpdateScaling = eventFunctions.makeThrottledAndDebouncedPromiseFunction(updateScalingIfRatiosHaveChanged)
			return optimizedUpdateScaling	
		},

		updatePageContainerScaling: (html, contentAspectRatio) =>
		{
			const containerIsWiderThanContent = displayHelpers.getAspectRatio(html) >= contentAspectRatio
			displayHelpers.setOneOfTwoClasses(html, containerIsWiderThanContent, "scale-to-height", "scale-to-width")
		},

		autoscalePageContainer: (html, contentAspectRatio) =>
		{
			const isContainerWiderThanContent = () => displayHelpers.getAspectRatio(html) >= contentAspectRatio
			const setScalingType = containerIsWiderThanContent => displayHelpers.setOneOfTwoClasses(html, containerIsWiderThanContent, "scale-to-height", "scale-to-width")
			const updateScalingIfRatiosHaveChanged = eventFunctions.makeFunctionThatExecutesOnConditionChange(setScalingType, isContainerWiderThanContent)
			const optimizedUpdateScaling = eventFunctions.makeThrottledAndDebouncedPromiseFunction(updateScalingIfRatiosHaveChanged)
			window.onresize = window.onorientationchange = optimizedUpdateScaling
		},
	}

	return pageDisplayFunctions
}


function createLazyDependencyInject(getters)
{
  var instances = {}
  var pendingInstances = new Stack()

  function getInstance(name)
  {
    if (instances[name])
    {
      return instances[name]
    }
    if (!getters.hasOwnProperty(name))
    {
      throw new Error(`Missing getter for ${name} dependency.`)
    }
    if (pendingInstances.contains(name))
    {
      throw new Error(`Circular dependency getter: ${name}.\nGetter stack:\n${pendingInstances.plus(name).toString("\n")}`)
    }
    pendingInstances.push(name)
    instances[name] = getters[name](inject)
    pendingInstances.pop()
    return instances[name]
  }

  var inject = (...nameList) => nameList.reduce((nameDic, name) => Object.defineProperty(nameDic, name, {value: getInstance(name)}), {})

  return inject
}


function getDependencyList()
{
  return {
    appDisplayLogic: getAppDisplayLogic,
    bookData: getBookData,
    bookLogic: getBookLogic,
    consts: getConsts,
    controlHelpers: getControlHelpers,
    controller: getController,
    displayHelpers: getDisplayHelpers,
    eventFunctions: getEventFunctions,
    pageDisplayLogic: getPageDisplayLogic,
    params: getUrlParams,
    restart: getRestartFunc,
    userPrefs: getUserPrefs,
  }
}


function getEventFunctions()
{
  const eventFunctions = {

    // Fires once and then unlistens
    setOneTimeEventCallback: (html, eventName, callback) =>
    {
      function onEvent()
      {
        html.removeEventListener("eventName", onEvent)
        callback()
      }
      html.addEventListener(eventName, onEvent)
    },

    // Default behavior: calls func if current condition != last condition.
    // Optional conditionChangePassesThreshold callback lets you supply a
    // custom comparator. The saveAlternativeValue function passed into it
    // lets you cache a custom value to be compared against on the next call.
    makeFunctionThatExecutesOnConditionChange: (func, evaluateCondition, conditionChangePassesThreshold = (newResult, lastResult, saveAlternativeValue) => newResult != lastResult) =>
    {
      var lastResult
      var shouldSaveAlternativeValue
      var alternativeValueToSave
      
      function saveAlternativeValue (value) 
      {
        shouldSaveAlternativeValue = true
        alternativeValueToSave = value
      }

      return function run()
      {
        shouldSaveAlternativeValue = false
        var result = evaluateCondition()
        if (conditionChangePassesThreshold(result, lastResult, saveAlternativeValue))
        {
          func(result)
        }
        lastResult = shouldSaveAlternativeValue ? alternativeValueToSave : result
      }
    },

    // Optimizes a function that may be called many times in quick succession,
    // like by an onresize or onscroll event. Throttles execution with a debounce
    // to catch the final update even during a throttle period.
    makeThrottledAndDebouncedPromiseFunction: (func, throttleDelay = 50, debounceDelay = 30) =>
    {
      var throttled = false
      var timeout
      
      var resolveWithFunctionResults = (resolve, func, input) => resolve(func(input))

      // Option to pass a value to func, or a function to get the up-to-date
      // value in case it might change during debounce period
      return function(funcArgumentOnPromiseCreation, getCurrentFuncArgument = () => funcArgumentOnPromiseCreation)
      {
        return new Promise(resolve => 
        {
          if (!throttled)
          {
            resolveWithFunctionResults(resolve, func, getCurrentFuncArgument())
            throttled = true
            setTimeout(() => {throttled = false}, throttleDelay)
          }
          clearTimeout(timeout)
          timeout = setTimeout(() => resolveWithFunctionResults(resolve, func, getCurrentFuncArgument()), debounceDelay)
        })
      }      
    }
  }

  return eventFunctions
}


function getConsts()
{
	return {
		DATASET: "readerAppElement"
	}
}


function Stack()
{
  function Node(value)
  {
    this.value = value
    this.below = null
  }

  function Stack(){
    this.top = null
  }

  Stack.prototype.plus = function(value)
  {
    var newStack = new Stack()
    newStack.top = this.top
    newStack.push(value)
    return newStack
  }

  Stack.prototype[Symbol.iterator] = function*()
  {
    var node = this.top
    while (node != null)
    {
      yield node.value
      node = node.below
    }
  }

  Stack.prototype.push = function(value)
  {
    var node = new Node(value)
    node.below = this.top
    this.top = node
  }

  Stack.prototype.pop = function()
  {
    var node = this.top
    if (node != null)
    {
      this.top = node.below
      return node.value
    }
    return null
  }

  Stack.prototype.contains = function(value)
  {
    for (var nodeValue of this)
    {
      if (nodeValue == value)
      {
        return true
      }
    }
    return false
  }

  Stack.prototype.toString = function(delimiter = " -> ")
  {
    var arr = []
    var node = this.top
    for (var value of this)
    {
      arr.push(value)
    }
    return arr.join(delimiter)
  }

  return new Stack()
}


