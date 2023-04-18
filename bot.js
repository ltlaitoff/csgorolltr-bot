// ==UserScript==
// @name         Bot
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @match        https://www.csgorolltr.com/en/withdraw/csgo/p2p
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

const main = () => {
  const whereFind = document.getElementsByTagName('cw-withdraw-search-grid')[0];

  console.log(whereFind);

  const result = [...whereFind.getElementsByTagName('cw-icon')]
    .map((item) => {
      const a = item.classList.contains('text-success');
      if (a) {
        if (item.getAttribute('inlinesvg') === 'assets/icons/flash.svg') {
          return item;
        }
      }
    })
    .filter((item) => item !== undefined);

  if (!result || result.length === 0) {
    console.log('not-find');
    return;
  }

  result.slice(0, 1).map((item) => {
    item.parentElement.click();
  });
};

let WORKING = false;

(function () {
  'use strict';
  const CLASSNAME = '.mat-button-wrapper';
  const TEXT = 'WITHDRAW';
  const TIME = 1000;

  document.addEventListener('keypress', (event) => {
    if (event.code === 'Equal') {
      WORKING = !WORKING;
    }
  });

  setInterval(() => {
    try {
      if (!WORKING) return;

      main();

      document.querySelectorAll(CLASSNAME).forEach((element) => {
        if (element.innerText === TEXT) element.click();
      });
    } catch (e) {
      console.log(e);
    }
  }, TIME);
})();
