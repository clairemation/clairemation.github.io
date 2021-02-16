function getAutoscaleBookDisplay(inject)
{
  var {displayFunctions, bookLogic} = inject("displayFunctions", "bookLogic")

  function updateScalingIfRatiosHaveChanged(html, containerWasWiderThanContentLastTime)
  {
    var containerIsWiderThanContent = displayFunctions.getAspectRatio(html) >= bookLogic.contentAspectRatio
    if (containerIsWiderThanContent != containerWasWiderThanContentLastTime)
    {
     displayFunctions.setOneOfTwoClasses(html, containerIsWiderThanContent, "scale-to-height", "scale-to-width") 
    }
    return containerIsWiderThanContent
  }

  return updateScalingIfRatiosHaveChanged
}


function getBookLogic(inject)
{
  var {params, bookData} = inject("params", "bookData")
    
  var {page, pageStep} = params
  var {pageMin, pageMax, pageWidth, pageHeight} = bookData
  var page2position = bookData.pageOneIsOnRightSide ? 0 : 1

  var pageIsWithinBook = page => page >= pageMin && page <= pageMax
  var getPageRangeForIndex = (index) => [start = index - ((index + page2position) % 2), start + 1]
  var getSinglePage = index => [index]
  var getPageSpread = index => getPageRangeForIndex(index).filter(pageIsWithinBook)

  var getPageRangeArrayForIndex = pageStep == 1 ? getSinglePage : getPageSpread

  var numDisplayedPages = getPageRangeArrayForIndex(page).length
   
  return {
    getPageRangeArrayForIndex,
    pageMin,
    pageMax,
    contentAspectRatio: pageWidth * numDisplayedPages / pageHeight,
    getPageUrls: () => getPageRangeArrayForIndex(page).map(bookData.convertIndexToImgUrl),
    getPageRangeStringForIndex : index => getPageRangeArrayForIndex(index).map(bookData.convertIndexToDisplayedPageNumber).join("–")
  }
}


function createControlLogic(inject)
{
  const {params, restart} = inject("params", "restart")

  const addNewParamsToExistingOnes = newParams => Object.assign({}, params, newParams)

  return controlLogic = {
    goToPage : index => restart(addNewParamsToExistingOnes({page: index})),
    setPageStep : pageStep => restart(addNewParamsToExistingOnes({pageStep}))
  }
}


const bookData =
{
  title: "Mementos: A Star Wars Fancomic",
  pageWidth: 1350,
  pageHeight: 1800,
  pageMin: 1,
  pageMax: 41,
  isComplete: false,
  pageOneIsOnRightSide: true,
  convertIndexToImgUrl: index => `../jpg/${index.toString().padStart(2, "0")}.jpg`,
  convertIndexToDisplayedPageNumber: num => num <= 4 ? (["", "i", "ii", "cover", "note"])[num] : (num - 4).toString()
}

const consts = {
  DATATAG: "data-reader-app-object-name",
  DATASET: "readerAppObjectName"
}


const dependencyGetters =
{
  consts: () => consts,
  bookData: () => bookData,
  params: getUrlParams,
  validateParams: createValidateParamsFunction,
  restart: () => restartWithNewUrlParams,
  controlLogic: createControlLogic,
  bookLogic: getBookLogic,
  bookLogicHelpers: () => bookLogicHelpers,
  displayController: getHtmlDisplayController,
  displayFunctions: getDisplayFunctions,
  autoscaleBookDisplay: getAutoscaleBookDisplay,
  redirectInvalidParams: getRedirectInvalidParams,
  eventFunctions: () => eventFunctions
}


function getHtmlDisplayController(inject)
{
  var {params, controlLogic, displayFunctions, autoscaleBookDisplay, bookLogic, eventFunctions} = inject("params", "controlLogic", "displayFunctions", "autoscaleBookDisplay", "bookLogic", "eventFunctions")

  var {page, pageStep} = params
  var {pageMin, pageMax} = bookLogic

  var {appContainer, displayContainer, pageContainer, slider, sliderOutput, nextButton, prevButton, helpButton, singlePageButton, spreadButton} = displayFunctions.getAppElements()

  init()

  function init()
  {
    initNavUi()
    initHelpUi()
    initSliderUi()
    setAutoScaling()
    displayPages()
  }

  function initNavUi()
  {
    displayFunctions.addOnClick(nextButton, () => goToPage(page + pageStep))
    displayFunctions.addOnClick(prevButton, () => goToPage(page - pageStep))
    displayFunctions.addOnClick(singlePageButton, () => setPageStep(1))
    displayFunctions.addOnClick(spreadButton, () => setPageStep(2))
    displayFunctions.setEnabled(singlePageButton, pageStep != 1)
    displayFunctions.setEnabled(spreadButton, pageStep != 2)
  }

  function initHelpUi()
  {
    displayFunctions.addOnClick(helpButton, () => displayFunctions.toggleHelp(appContainer))
    displayFunctions.addOnClick(appContainer, () => displayFunctions.hideHelp(appContainer))
  }

  function initSliderUi()
  {
    displayFunctions.setText(sliderOutput, bookLogic.getPageRangeStringForIndex(page))
    displayFunctions.setValues(slider, {
      max: pageMax / pageStep,
      min: pageMin / pageStep,
      value: page / pageStep
    })
    displayFunctions.addOnChange(slider, rawValue => displayFunctions.setText(sliderOutput, bookLogic.getPageRangeStringForIndex(rawValue * pageStep)))
    displayFunctions.addOnPointerUp(slider, rawValue => goToPage(rawValue * pageStep))
  }

  function setAutoScaling()
  {
    eventFunctions.setFrequentlyCalledEvent(window, lastRatioCheckResult => autoscaleBookDisplay(displayContainer, lastRatioCheckResult), "onresize", "onorientationchange")
  }

  function displayPages()
  {
    var pageUrls = bookLogic.getPageUrls(page)
    displayFunctions.loadPages(pageContainer, pageUrls).then(() => 
    {
      displayFunctions.startAnimationPromise(displayContainer, "fadeIn")
      autoscaleBookDisplay(displayContainer)
    })
  }

  function goToPage(index)
  {
    displayFunctions.startAnimationPromise(displayContainer, "fadeOut").then(() => controlLogic.goToPage(index))
  }

  function setPageStep(value)
  {
    displayFunctions.startAnimationPromise(displayContainer, "fadeOut").then(() => controlLogic.setPageStep(value))
  }
}


function getDisplayFunctions(inject)
{
  var {eventFunctions, consts} = inject("eventFunctions", "consts")

  var myself = {

    getAppElements: () => 
    {
      var htmlElements = Array.from(document.querySelectorAll(`[${consts.DATATAG}]`))
      var displayElements = Object.fromEntries(htmlElements.map(e => [e.dataset[consts.DATASET], e]))
      return displayElements
    },

    setValues: Object.assign,

    setText: (html, text) =>
    {
      html.innerHTML = text
    },

    getAspectRatio: html =>
    {
      return html.clientWidth / html.clientHeight
    },

    startAnimationPromise: (html, name) =>
    {
      const animationClasses = {
        fadeIn: "fade-in",
        fadeOut: "fade-out"
      }
      
      const className = animationClasses[name]

      if (!className)
      {
        return Promise.reject(`Animation ${name} not found`)
      }

      return new Promise(resolve => {
        eventFunctions.setOneTimeEventCallback(html, "animationend", () => resolve(html))
        html.classList.add(className)
      })
    },

    setOneOfTwoClasses: (html, condition, classIfTrue, classIfFalse) =>
    {
      var className = condition ? classIfTrue : classIfFalse
      html.classList.remove(classIfTrue)
      html.classList.remove(classIfFalse)
      html.classList.add(className)
    },

    loadPages: (html, urls) => myself.loadElements(html, urls, myself.createPagePromise),

    loadElements: (html, urls, createElementPromise) =>
    {
      var loadPromises = urls.map(url => createElementPromise(url))
      return new Promise(resolve => 
      {
        Promise.all(loadPromises).then(children =>
        {
          children.forEach(child => html.appendChild(child))
          resolve()
        })
      })
    },

    createPagePromise: url =>
    {
      return new Promise(resolve => {
        var div = document.createElement("div")
        var img = document.createElement("img")
        div.appendChild(img)
        div.setAttribute("class", "page")
        img.setAttribute("class", "page")
        img.addEventListener("load", () => resolve(div))
        img.src = url
      })
    },

    toggleHelp: html =>
    {
      if (html.classList.contains("show-help"))
      {
        html.classList.remove("show-help")
        html.classList.add("fade-help")
      }
      else
      {
        html.classList.remove("fade-help")
        setTimeout(() => html.classList.add("show-help"), 0) //Needs timeout to avoid retriggering on the same click
      }
    },

    hideHelp: html =>
    {
      if (html.classList.contains("show-help"))
      {
        html.classList.remove("show-help")
        html.classList.add("fade-help")
      }
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

    addOnChange: (html, func) => html.oninput = () => func(html.value),

    setEnabled: (html, enabled) => enabled ? html.classList.remove("disabled") : html.classList.add("disabled")
  }

  return myself
}


var eventFunctions = {

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

  // Optimizes execution For events that are called a lot in quick succession,
  // like resizing or scrolling. Function execution is debounded and throttled.
  // Optionally, the function may compare 
  setFrequentlyCalledEvent: (caller, func, ...events) =>
  {
    var throttledAndDebouncedFunction = eventFunctions.makeThrottledAndDebouncedFunctionThatPassesACachedValueToItselfBetweenCalls(func)
    for (var i = 0; i < events.length; i++)
    {
      caller[events[i]] = throttledAndDebouncedFunction
    }
  },

  // Execute a function only if a condition has changed since the last call.
  // Optionally takes a comparison function for more complicated comparison
  // of conditions, e.g. if a condition has changed by a certain AMOUNT.
  // Normally the results of each evaluateCondition call get saved as the
  // next call's lastResult, but you can choose to save a different value
  // in lastResult by using the saveAlternativeValue function passed into
  // the conditionPassesThreshold callback. 
  makeFunctionThatExecutesOnConditionChange: (func, evaluateCondition, conditionPassesThreshold = (newResult, lastResult, saveAlternativeValue) => newResult != lastResult) =>
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
      if (compareConditionWithPrevious(result, lastResult, saveAlternativeValue))
      {
        func(result)
      }
      lastResult = shouldSaveAlternativeValue ? alternativeValueToSave : result
    }
  },

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
  },

  makeThrottledAndDebouncedFunctionThatPassesACachedValueToItselfBetweenCalls: (func, throttleDelay = 50, debounceDelay = 30) =>
  {
    var cachedValue = null
    var getCurrentCachedValue = () => cachedValue
    
    var throttledAndDebouncedPromiseFunction = eventFunctions.makeThrottledAndDebouncedPromiseFunction(func, throttleDelay, debounceDelay)
    
    function runFuncAndUpdateCachedValue()
    {
      // Pass cache getter instead of its current value, so function
      // always has the current cache value at execution time
      throttledAndDebouncedPromiseFunction(null, getCurrentCachedValue).then(result => cachedValue = result)
    }

    return runFuncAndUpdateCachedValue
  }
}


function getUrlParams(inject)
{
  var {validateParams} = inject("validateParams")
  var params = Object.fromEntries(new URLSearchParams(window.location.search))
  return validateParams(params)
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

  var inject = (...nameList) => Object.fromEntries(nameList.map(name => [name, getInstance(name)]))

  return inject
}


function getRedirectInvalidParams(inject)
{
	var {restart, bookData} = inject("restart", "bookData")

	return function redirectInvalidParams() 
	{
		var {page, pageStep} = Object.fromEntries(new URLSearchParams(window.location.search))
		var correctedParams = {page}
		if (pageStep)
		{
			correctedParams.pageStep = pageStep
		}
		var shouldRestart = false

		try
		{
			var pageInt = parseInt(page)
			if (!pageInt)
			{
				correctParams({page: bookData.pageMin})
			}
			else if (pageInt < bookData.pageMin)
			{
				correctParams({page: bookData.pageMin})
			}
			else if (pageInt > bookData.pageMax)
			{
				correctParams({page: bookData.pageMax})

			}
		}
		catch
		{
			correctParams({page: bookData.pageMin})
		}

		try
		{
			if (pageStep)
			{
				var pageStepInt = parseInt(pageStep)
				if (!pageStepInt)
				{
					correctParams({pageStep: 1})
				}
				else if (pageStepInt < 1)
				{
					correctParams({pageStep: 1})
				}
				else if (pageStepInt > 2)
				{
					correctParams({pageStep: 7})
				}
			}
		}
		catch
		{
			correctParams({pageStep: 1})
		}

		if (shouldRestart)
		{
			restart(correctedParams)
		}
		
		function correctParams(corrected)
		{
			correctedParams = Object.assign(correctedParams, corrected)
			shouldRestart = true
		}
	}

}


function restartWithNewUrlParams(paramsObj)
{
  var paramString = "?" + Object.entries(paramsObj).map(keyValuePair => `${keyValuePair[0]}=${keyValuePair[1]}`).join("&")
  window.location.href = paramString
}


var Stack = (() =>
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

  return Stack
})()


window.addEventListener("load", () => 
{
  var inject = createLazyDependencyInject(dependencyGetters)
  
  var {redirectInvalidParams} = inject("redirectInvalidParams")
  redirectInvalidParams()
  
  inject("displayController")
})

startUp()

function startUp()
{
  (function initButtonStatesEarly()
  {
    var pageStep = (new URLSearchParams(window.location.search)).get("pageStep")
    var buttonToDisable = parseInt(pageStep) == 1 ? "singlePageButton" : "spreadButton"
    document.querySelector(`[data-reader-app-object-name=${buttonToDisable}]`).classList.add("disabled")
  })()
}


function createValidateParamsFunction(inject)
{
  var {bookData} = inject("bookData")
  
  return params => validateParams(params, bookData)

  function validateParams(params, bookData)
  {
    var outParams = {}

    outParams.page = parseInt(params.page) || 1
    outParams.pageStep = parseInt(params.pageStep) || (function findBestFittingPageStepForDisplay()
    {
      var spreadAspectRatio = bookData.pageWidth * 2 / bookData.pageHeight
      var displayContainer = document.querySelector(`[${consts.DATATAG}='displayContainer']`)
      var displayAspectRatio = displayContainer.clientWidth / displayContainer.clientHeight
      return displayAspectRatio >= spreadAspectRatio ? 2 : 1
    })()

    return outParams
  }
}


