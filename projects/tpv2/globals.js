var UP_PRESS = 0,
    LEFT_PRESS = 1,
    DOWN_PRESS = 2,
    RIGHT_PRESS = 3,
    UP_RELEASE = 4,
    LEFT_RELEASE = 5,
    DOWN_RELEASE = 6,
    RIGHT_RELEASE = 7,
    RUN_RIGHT = 8,
    RUN_LEFT = 9,
    RUN_UP = 10,
    RUN_DOWN = 11,
    STOP_X = 12,
    STOP_Y = 13,
    HIT = 8;
var FRAMERATE = 150; // milliseconds per frame
var SCALE = .5;
var WALKMASK_SCALE = 1
var walkmaskSrc = "data:image/gif;base64,R0lGODlhAAikBoAAAP///wAAACH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4zLWMwMTEgNjYuMTQ1NjYxLCAyMDEyLzAyLzA2LTE0OjU2OjI3ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkMxQTgwNTNGQUIyMDY4MTE4QzE0RUVCNUY2MjY3MDUzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU4QkE5NTM5NDRCMTExRTY4QjBBRTcxNzM2QTkzRkVDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU4QkE5NTM4NDRCMTExRTY4QjBBRTcxNzM2QTkzRkVDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDowMjgwMTE3NDA3MjA2ODExODNEMTkzQ0U0OEY1OTM0RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDMUE4MDUzRkFCMjA2ODExOEMxNEVFQjVGNjI2NzA1MyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAAAAAAALAAAAAAACKQGAAL/jI+py+0Po5y02ouz3rz7D4biSJbmiabqyrbuC8fyTNf2jef6zvf+DwwKh8Si8YhMKpfMpvMJjUqn1Kr1is1qt9yu9wsOi8fksvmMTqvX7Lb7DY/L5/S6/Y7P6/f8vv8PGCg4SFhoeIiYqLjI2Oj4CBkpOUlZaXmJmam5ydnp+QkaKjpKWmp6ipqqusra6voKGys7S1tre4ubq7vL2+v7CxwsPExcbHyMnKy8zNzs/AwdLT1NXW19jZ2tvc3d7f0NHi4+Tl5ufo6err7O3u7+Dh8vP09fb3+Pn6+/z9/v/w8woMCBBAsaPIgwocKFDBs6fAgxosSJFCtavIgxo8aN/xw7evwIMqTIkSRLmjyJMqXKlSxbunwJM6bMmTRr2ryJM6fOnTx7+vwJNKjQoUSLGj2KNKnSpUybOn0KNarUqVSrWr2KNavWrVy7ev0KNqzYsWTLmj2LNq3atWzbun0LN67cuXTr2r2LN6/evXz7+v0LOLDgwYQLGz6MOLHixYwbO34MObLkyZQrW76MObPmzZw7e/4MOrTo0aRLmz6NOrXq1axbu34NO7bs2bRr276NO7fu3bx7+/4NPLjw4cSLGz+OPLny5cybO38OPbr06dSrW7+OPbv27dy7e/8OPrz48eTLmz+PPr369ezbu38PP778+fTr27+PP7/+/fz7+///D2CAAg5IYIEGHohgggouyGCDDj4IYYQSTkhhhRZeiGGGGm7IYYcefghiiCKOSGKJJp6IYooqrshiiy6+CGOMMs5IY4023ohjjjruyGOPPv4IZJBCDklkkUYeiWSSSi7JZJNOPglllFJOSWWVVl6JZZZabslll15+CWaYYo5JZplmnolmmmquyWabbr4JZ5xyzklnnXbeiWeeeu7JZ59+/glooIIOSmihhh6KaKKKLspoo44+Cmmkkk5KaaWWXopppppuymmnnn4Kaqiijkpqqaaeimqqqq7KaquuvgprrLLOSmuttt6Ka6667sprr77+Cmywwg5LbLHGHotsssr/Lstss84+C2200k5LbbXWXottttpuy2233n4Lbrjijktuueaei2666q7LbrvuvgtvvPLOS2+99t6Lb7767stvv/7+C3DAAg9McMEGH4xwwgovzHDDDj8MccQST0xxxRZfjHHGGm/McccefwxyyCKPTHLJJp+Mcsoqr8xyyy6/DHPMMs9Mc80234xzzjrvzHPPPv8MdNBCD0100UYfjXTSSi/NdNNOPw111FJPTXXVVl+NddZab811115/DXbYYo9Ndtlmn4122mqvzXbbbr8Nd9xyz0133XbfjXfeeu/Nd99+/w144IIPTnjhhh+OeOKKL854444/Dnnkkk9OeeWW/1+Oeeaab855555/Dnrooo9Oeummn4566qqvznrrrr8Oe+yyz0577bbfjnvuuu/Oe+++/w588MIPT3zxxh+PfPLKL898884/D3300k9PffXWX4999tpvz3333n8Pfvjij09++eafj3766q/Pfvvuvw9//PLPT3/99t+Pf/76789///7/D8AACnCABCygAQ+IwAQqcIEMbKADHwjBCEpwghSsoAUviMEManCDHOygBz8IwhCKcIQkLKEJT4jCFKpwhSxsoQtfCMMYynCGNKyhDW+IwxzqcIc87KEPfwjEIApxiEQsohGPiMQkKnGJTGyiE58IxShKcYpUrKIVr4jFLP9qcYtc7KIXvwjGMIpxjGQsoxnPiMY0qnGNbGyjG98IxzjKcY50rKMd74jHPOpxj3zsox//CMhACnKQhCykIQ+JyEQqcpGMbKQjHwnJSEpykpSspCUviclManKTnOykJz8JylCKcpSkLKUpT4nKVKpylaxspStfCctYynKWtKylLW+Jy1zqcpe87KUvfwnMYApzmMQspjGPicxkKnOZzGymM58JzWhKc5rUrKY1r4nNbGpzm9zspje/Cc5winOc5CynOc+JznSqc53sbKc73wnPeMpznvSspz3vic986nOf/OynP/8J0IAKdKAELahBD4rQhCp0oQxtqEMfCtGISnT/ohSt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"