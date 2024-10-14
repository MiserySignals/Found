/*------------------Линейный прогресс бар---------------------------*/
document.addEventListener("DOMContentLoaded", function () {
   function animateValue(element, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
         if (!startTimestamp) startTimestamp = timestamp;
         const progress = Math.min((timestamp - startTimestamp) / duration, 1);
         element.innerText = Math.floor(progress * (end - start) + start).toLocaleString('ru-RU') + ' Руб.';
         if (progress < 1) {
            window.requestAnimationFrame(step);
         }
      };
      window.requestAnimationFrame(step);
   }

   let allBlocks = document.querySelectorAll(".projects-card, .donate-progress");

   allBlocks.forEach(function (block) {
      let allocatedSumElement = block.querySelector(".progressline__start .progressline__sum");
      let targetSumElement = block.querySelector(".progressline__target .progressline__sum");
      let progressBar = block.querySelector(".progressbar__progressbar-fill");
      let allocatedAmount = parseInt(allocatedSumElement.innerText.replace(/\D/g, ""));
      let targetAmount = parseInt(targetSumElement.innerText.replace(/\D/g, ""));
      let progressPercentage = (allocatedAmount / targetAmount) * 100;
      progressBar.style.width = progressPercentage + "%";

      animateValue(allocatedSumElement, 0, allocatedAmount, 400);
   });
});
/*----------------Круг-----------------------------*/
let circularProgress = document.querySelector(".diagram-progress"),
   progressValue = document.querySelector(".diagram-progress__value");

let progressStartValue = 0,
   progressEndValue = 1000000000,
   currentProgressValue = 422587155,
   duration = 1000;
let startTime = null;

function animateProgress(timestamp) {
   if (!startTime) startTime = timestamp;
   let progress = timestamp - startTime;
   let currentProgress = Math.min(currentProgressValue, progressStartValue + (currentProgressValue * (progress / duration)));
   let progressPercentage = Math.round((currentProgress / progressEndValue) * 100);
   progressValue.innerHTML = `${Math.round(currentProgress).toLocaleString()} Р.`;
   circularProgress.style.background = `conic-gradient(#00A7D8 ${progressPercentage * 3.6}deg, rgba(226, 234, 238, 0.2) ${progressPercentage * 3.6}deg 360deg)`;
   if (progress < duration) {
      requestAnimationFrame(animateProgress);
   } else {
      progressValue.innerHTML = `${currentProgressValue.toLocaleString()} Р.`;
      circularProgress.style.background = `conic-gradient(#00A7D8 ${currentProgressValue / (progressEndValue / 100) * 3.6}deg, rgba(226, 234, 238, 0.2) ${currentProgressValue / (progressEndValue / 100) * 3.6}deg 360deg)`;
   }
}
requestAnimationFrame(animateProgress);
/*------------------Только число---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const amountInput = document.getElementById('donation-amount');
   const buttons = document.querySelectorAll('.donation-form-sum__btn');
   function removeActiveClass() {
      buttons.forEach(btn => btn.classList.remove('donation-form-sum__btn_active'));
   }
   buttons.forEach(button => {
      button.addEventListener('click', function () {
         const amount = this.getAttribute('data-amount');
         amountInput.value = amount;
         removeActiveClass();
         this.classList.add('donation-form-sum__btn_active');
      });
   });

   amountInput.addEventListener('input', function () {
      let inputValue = this.value;
      inputValue = inputValue.replace(/[^0-9]/g, '');
      this.value = inputValue;
      let foundMatch = false;
      buttons.forEach(button => {
         if (button.getAttribute('data-amount') === inputValue) {
            foundMatch = true;
            button.classList.add('donation-form-sum__btn_active');
         } else {
            button.classList.remove('donation-form-sum__btn_active');
         }
      });
      if (!foundMatch) {
         removeActiveClass();
      }
   });
});
/*--------------------Options-------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const amountInput = document.getElementById('donation-amount');
   const buttons = document.querySelectorAll('.donation-form-sum__btn');
   function removeActiveClass() {
      buttons.forEach(btn => btn.classList.remove('donation-form-sum__btn_active'));
   }

   buttons.forEach(button => {
      button.addEventListener('click', function () {
         const amount = this.getAttribute('data-amount');
         amountInput.value = amount;

         removeActiveClass();
         this.classList.add('donation-form-sum__btn_active');
      });
   });

   amountInput.addEventListener('input', function () {
      const inputValue = this.value;
      let foundMatch = false;
      buttons.forEach(button => {
         if (button.getAttribute('data-amount') === inputValue) {
            foundMatch = true;
            button.classList.add('donation-form-sum__btn_active');
         } else {
            button.classList.remove('donation-form-sum__btn_active');
         }
      });

      if (!foundMatch) {
         removeActiveClass();
      }
   });
});
/*--------------------Валидация-------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const mainForm = document.getElementById('donationForm');
   const amountForm = document.getElementById('donationAmountForm');
   const donationAmountInput = document.getElementById('donation-amount');
   const firstNameInput = document.querySelector('input[name="firstName"]');
   const lastNameInput = document.querySelector('input[name="lastName"]');
   const birthYearInput = document.querySelector('input[name="birthYear"]');
   const currentYear = new Date().getFullYear();

   mainForm.addEventListener('submit', formSend);

   // ЗАПРЕЩЕНО ПИСАТЬ НЕ ТО ЧЕ НАДО
   donationAmountInput.addEventListener('input', function () {
      if (this.value.length > 1 && this.value.startsWith('0')) {
         this.value = this.value.replace(/^0+/, '');
      }
   });

   firstNameInput.addEventListener('input', function () {
      this.value = this.value.replace(/[0-9]/g, '');
   });

   lastNameInput.addEventListener('input', function () {
      this.value = this.value.replace(/[0-9]/g, '');
   });

   birthYearInput.addEventListener('input', function () {
      this.value = this.value.replace(/[^0-9]/g, '');
   });

   mainForm.addEventListener('submit', function (e) {
      let year = parseInt(birthYearInput.value, 10);

      if (year < 1950 || year > currentYear) {
         e.preventDefault();
         showAlert('Год рождения должен быть в диапазоне от 1950 до ' + currentYear, 'error');
         formAddError(birthYearInput);
      } else {
         formRemoveError(birthYearInput);
      }
   });

   async function formSend(e) {
      e.preventDefault();
      let error = formValidate(mainForm);
      let formData = new FormData(mainForm);

      if (donationAmountInput.value.trim() === '') {
         formAddError(donationAmountInput);
         error++;
      } else {
         formRemoveError(donationAmountInput);
         formData.append('donationAmount', donationAmountInput.value);
      }

      if (error === 0) {
         mainForm.classList.add('_sending');
         let response = await fetch('sendmail.php', {
            method: 'POST',
            body: formData
         });
         if (response.ok) {
            let result = await response.json();
            showAlert(result.message, 'success');
            mainForm.reset();
            amountForm.reset();
         } else {
            showAlert('Ошибка при отправке формы.', 'error');
         }
         mainForm.classList.remove('_sending');
      } else {
         showAlert('Не все обязательные поля заполнены', 'error');
      }
   }

   function formValidate(form) {
      let error = 0;
      let formReq = form.querySelectorAll('._req');

      formReq.forEach(input => {
         formRemoveError(input);
         if (input.getAttribute("type") === "email" && emailTest(input)) {
            formAddError(input);
            error++;
         } else if (input.getAttribute("type") === "checkbox" && !input.checked) {
            formAddError(input);
            error++;
         } else if (input.value.trim() === '') {
            formAddError(input);
            error++;
         }
      });

      return error;
   }

   function formAddError(input) {
      if (input.closest('.donation-form-sum__field')) {
         input.closest('.donation-form-sum__field').classList.add('_error');
      } else if (input.classList.contains('form-right__input')) {
         input.classList.add('_error');
      } else if (input.classList.contains('form-right-agreement__input')) {
         const label = input.closest('.form-right-agreement').querySelector('.form-right-agreement__conditions');
         if (label) {
            label.classList.add('_error');
         }
      }
   }

   function formRemoveError(input) {
      if (input.closest('.donation-form-sum__field')) {
         input.closest('.donation-form-sum__field').classList.remove('_error');
      } else if (input.classList.contains('form-right__input')) {
         input.classList.remove('_error');
      } else if (input.classList.contains('form-right-agreement__input')) {
         const label = input.closest('.form-right-agreement').querySelector('.form-right-agreement__conditions');
         if (label) {
            label.classList.remove('_error');
         }
      }
   }

   function emailTest(input) {
      return !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
   }

   function showAlert(message, type) {
      const notificationContainer = document.getElementById('notification-container');
      notificationContainer.innerHTML = '';
      const notification = document.createElement('div');
      notification.classList.add('notification', type);
      const notificationMessage = document.createElement('span');
      notificationMessage.innerText = message;
      const closeButton = document.createElement('button');
      closeButton.classList.add('close');
      closeButton.innerHTML = '&times;';
      closeButton.onclick = () => notificationContainer.removeChild(notification);
      notification.appendChild(notificationMessage);
      notification.appendChild(closeButton);
      notificationContainer.appendChild(notification);
      setTimeout(() => {
         if (notificationContainer.contains(notification)) {
            notificationContainer.removeChild(notification);
         }
      }, 5000);
   }
});
/*---------------------------------------------*/
(() => {
   "use strict";
   const flsModules = {};
   function isWebp() {
      function testWebP(callback) {
         let webP = new Image;
         webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
         };
         webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
      }
      testWebP((function (support) {
         let className = support === true ? "webp" : "no-webp";
         document.documentElement.classList.add(className);
      }));
   }
   /*Получения текущего хэша*/
   function getHash() {
      if (location.hash) return location.hash.replace("#", "");
   }
   /*Установки нового хэша в UR*/
   function setHash(hash) {
      hash = hash ? `#${hash}` : window.location.href.split("#")[0];
      history.pushState("", "", hash);
   }
   /*Сворачивания и разворачивания элементов (спойлер)*/
   let _slideUp = (target, duration = 500, showmore = 0) => {
      if (!target.classList.contains("_slide")) {
         target.classList.add("_slide");
         target.style.transitionProperty = "height, margin, padding";
         target.style.transitionDuration = duration + "ms";
         target.style.height = `${target.offsetHeight}px`;
         target.offsetHeight;
         target.style.overflow = "hidden";
         target.style.height = showmore ? `${showmore}px` : `0px`;
         target.style.paddingTop = 0;
         target.style.paddingBottom = 0;
         target.style.marginTop = 0;
         target.style.marginBottom = 0;
         window.setTimeout((() => {
            target.hidden = !showmore ? true : false;
            !showmore ? target.style.removeProperty("height") : null;
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            !showmore ? target.style.removeProperty("overflow") : null;
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
            document.dispatchEvent(new CustomEvent("slideUpDone", {
               detail: {
                  target
               }
            }));
         }), duration);
      }
   };
   let _slideDown = (target, duration = 500, showmore = 0) => {
      if (!target.classList.contains("_slide")) {
         target.classList.add("_slide");
         target.hidden = target.hidden ? false : null;
         showmore ? target.style.removeProperty("height") : null;
         let height = target.offsetHeight;
         target.style.overflow = "hidden";
         target.style.height = showmore ? `${showmore}px` : `0px`;
         target.style.paddingTop = 0;
         target.style.paddingBottom = 0;
         target.style.marginTop = 0;
         target.style.marginBottom = 0;
         target.offsetHeight;
         target.style.transitionProperty = "height, margin, padding";
         target.style.transitionDuration = duration + "ms";
         target.style.height = height + "px";
         target.style.removeProperty("padding-top");
         target.style.removeProperty("padding-bottom");
         target.style.removeProperty("margin-top");
         target.style.removeProperty("margin-bottom");
         window.setTimeout((() => {
            target.style.removeProperty("height");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            target.classList.remove("_slide");
            document.dispatchEvent(new CustomEvent("slideDownDone", {
               detail: {
                  target
               }
            }));
         }), duration);
      }
   };
   let _slideToggle = (target, duration = 500) => {
      if (target.hidden) return _slideDown(target, duration); else return _slideUp(target, duration);
   };

   /*Управления состоянием блокировки прокрутки страницы*/
   let bodyLockStatus = true;
   let bodyLockToggle = (delay = 500) => {
      if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
   };
   let bodyUnlock = (delay = 500) => {
      let body = document.querySelector("body");
      if (bodyLockStatus) {
         let lock_padding = document.querySelectorAll("[data-lp]");
         setTimeout((() => {
            for (let index = 0; index < lock_padding.length; index++) {
               const el = lock_padding[index];
               el.style.paddingRight = "0px";
            }
            body.style.paddingRight = "0px";
            document.documentElement.classList.remove("lock");
         }), delay);
         bodyLockStatus = false;
         setTimeout((function () {
            bodyLockStatus = true;
         }), delay);
      }
   };
   let bodyLock = (delay = 500) => {
      let body = document.querySelector("body");
      if (bodyLockStatus) {
         let lock_padding = document.querySelectorAll("[data-lp]");
         for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
         }
         body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
         document.documentElement.classList.add("lock");
         bodyLockStatus = false;
         setTimeout((function () {
            bodyLockStatus = true;
         }), delay);
      }
   };
   /*Раскрытие и скрытие спойлера*/
   function spollers() {
      const spollersArray = document.querySelectorAll("[data-spollers]");
      if (spollersArray.length > 0) {
         document.addEventListener("click", setSpollerAction);
         const spollersRegular = Array.from(spollersArray).filter((function (item, index, self) {
            return !item.dataset.spollers.split(",")[0];
         }));
         if (spollersRegular.length) initSpollers(spollersRegular);
         let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
         if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
            mdQueriesItem.matchMedia.addEventListener("change", (function () {
               initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
         }));
         function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach((spollersBlock => {
               spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
               if (matchMedia.matches || !matchMedia) {
                  spollersBlock.classList.add("_spoller-init");
                  initSpollerBody(spollersBlock);
               } else {
                  spollersBlock.classList.remove("_spoller-init");
                  initSpollerBody(spollersBlock, false);
               }
            }));
         }
         function initSpollerBody(spollersBlock, hideSpollerBody = true) {
            let spollerItems = spollersBlock.querySelectorAll("details");
            if (spollerItems.length) spollerItems.forEach((spollerItem => {
               let spollerTitle = spollerItem.querySelector("summary");
               if (hideSpollerBody) {
                  spollerTitle.removeAttribute("tabindex");
                  if (!spollerItem.hasAttribute("data-open")) {
                     spollerItem.open = false;
                     spollerTitle.nextElementSibling.hidden = true;
                  } else {
                     spollerTitle.classList.add("_spoller-active");
                     spollerItem.open = true;
                  }
               } else {
                  spollerTitle.setAttribute("tabindex", "-1");
                  spollerTitle.classList.remove("_spoller-active");
                  spollerItem.open = true;
                  spollerTitle.nextElementSibling.hidden = false;
               }
            }));
         }
         function setSpollerAction(e) {
            const el = e.target;
            if (el.closest("summary") && el.closest("[data-spollers]")) {
               e.preventDefault();
               if (el.closest("[data-spollers]").classList.contains("_spoller-init")) {
                  const spollerTitle = el.closest("summary");
                  const spollerBlock = spollerTitle.closest("details");
                  const spollersBlock = spollerTitle.closest("[data-spollers]");
                  const oneSpoller = spollersBlock.hasAttribute("data-one-spoller");
                  const scrollSpoller = spollerBlock.hasAttribute("data-spoller-scroll");
                  const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                  if (!spollersBlock.querySelectorAll("._slide").length) {
                     if (oneSpoller && !spollerBlock.open) hideSpollersBody(spollersBlock);
                     !spollerBlock.open ? spollerBlock.open = true : setTimeout((() => {
                        spollerBlock.open = false;
                     }), spollerSpeed);
                     spollerTitle.classList.toggle("_spoller-active");
                     _slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
                     if (scrollSpoller && spollerTitle.classList.contains("_spoller-active")) {
                        const scrollSpollerValue = spollerBlock.dataset.spollerScroll;
                        const scrollSpollerOffset = +scrollSpollerValue ? +scrollSpollerValue : 0;
                        const scrollSpollerNoHeader = spollerBlock.hasAttribute("data-spoller-scroll-noheader") ? document.querySelector(".header").offsetHeight : 0;
                        window.scrollTo({
                           top: spollerBlock.offsetTop - (scrollSpollerOffset + scrollSpollerNoHeader),
                           behavior: "smooth"
                        });
                     }
                  }
               }
            }
            if (!el.closest("[data-spollers]")) {
               const spollersClose = document.querySelectorAll("[data-spoller-close]");
               if (spollersClose.length) spollersClose.forEach((spollerClose => {
                  const spollersBlock = spollerClose.closest("[data-spollers]");
                  const spollerCloseBlock = spollerClose.parentNode;
                  if (spollersBlock.classList.contains("_spoller-init")) {
                     const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
                     spollerClose.classList.remove("_spoller-active");
                     _slideUp(spollerClose.nextElementSibling, spollerSpeed);
                     setTimeout((() => {
                        spollerCloseBlock.open = false;
                     }), spollerSpeed);
                  }
               }));
            }
         }
         function hideSpollersBody(spollersBlock) {
            const spollerActiveBlock = spollersBlock.querySelector("details[open]");
            if (spollerActiveBlock && !spollersBlock.querySelectorAll("._slide").length) {
               const spollerActiveTitle = spollerActiveBlock.querySelector("summary");
               const spollerSpeed = spollersBlock.dataset.spollersSpeed ? parseInt(spollersBlock.dataset.spollersSpeed) : 500;
               spollerActiveTitle.classList.remove("_spoller-active");
               _slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
               setTimeout((() => {
                  spollerActiveBlock.open = false;
               }), spollerSpeed);
            }
         }
      }
   }
   /*Табы*/
   function tabs() {
      const tabs = document.querySelectorAll("[data-tabs]");
      let tabsActiveHash = [];
      if (tabs.length > 0) {
         const hash = getHash();
         if (hash && hash.startsWith("tab-")) tabsActiveHash = hash.replace("tab-", "").split("-");
         tabs.forEach(((tabsBlock, index) => {
            tabsBlock.classList.add("_tab-init");
            tabsBlock.setAttribute("data-tabs-index", index);
            tabsBlock.addEventListener("click", setTabsAction);
            initTabs(tabsBlock);
         }));
         let mdQueriesArray = dataMediaQueries(tabs, "tabs");
         if (mdQueriesArray && mdQueriesArray.length) mdQueriesArray.forEach((mdQueriesItem => {
            mdQueriesItem.matchMedia.addEventListener("change", (function () {
               setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            }));
            setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
         }));
      }
      function setTitlePosition(tabsMediaArray, matchMedia) {
         tabsMediaArray.forEach((tabsMediaItem => {
            tabsMediaItem = tabsMediaItem.item;
            let tabsTitles = tabsMediaItem.querySelector("[data-tabs-titles]");
            let tabsTitleItems = tabsMediaItem.querySelectorAll("[data-tabs-title]");
            let tabsContent = tabsMediaItem.querySelector("[data-tabs-body]");
            let tabsContentItems = tabsMediaItem.querySelectorAll("[data-tabs-item]");
            tabsTitleItems = Array.from(tabsTitleItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
            tabsContentItems = Array.from(tabsContentItems).filter((item => item.closest("[data-tabs]") === tabsMediaItem));
            tabsContentItems.forEach(((tabsContentItem, index) => {
               if (matchMedia.matches) {
                  tabsContent.append(tabsTitleItems[index]);
                  tabsContent.append(tabsContentItem);
                  tabsMediaItem.classList.add("_tab-spoller");
               } else {
                  tabsTitles.append(tabsTitleItems[index]);
                  tabsMediaItem.classList.remove("_tab-spoller");
               }
            }));
         }));
      }
      function initTabs(tabsBlock) {
         let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-titles]>*");
         let tabsContent = tabsBlock.querySelectorAll("[data-tabs-body]>*");
         const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
         const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
         if (tabsActiveHashBlock) {
            const tabsActiveTitle = tabsBlock.querySelector("[data-tabs-titles]>._tab-active");
            tabsActiveTitle ? tabsActiveTitle.classList.remove("_tab-active") : null;
         }
         if (tabsContent.length) tabsContent.forEach(((tabsContentItem, index) => {
            tabsTitles[index].setAttribute("data-tabs-title", "");
            tabsContentItem.setAttribute("data-tabs-item", "");
            if (tabsActiveHashBlock && index == tabsActiveHash[1]) tabsTitles[index].classList.add("_tab-active");
            tabsContentItem.hidden = !tabsTitles[index].classList.contains("_tab-active");
         }));
      }
      function setTabsStatus(tabsBlock) {
         let tabsTitles = tabsBlock.querySelectorAll("[data-tabs-title]");
         let tabsContent = tabsBlock.querySelectorAll("[data-tabs-item]");
         const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
         function isTabsAnamate(tabsBlock) {
            if (tabsBlock.hasAttribute("data-tabs-animate")) return tabsBlock.dataset.tabsAnimate > 0 ? Number(tabsBlock.dataset.tabsAnimate) : 500;
         }
         const tabsBlockAnimate = isTabsAnamate(tabsBlock);
         if (tabsContent.length > 0) {
            const isHash = tabsBlock.hasAttribute("data-tabs-hash");
            tabsContent = Array.from(tabsContent).filter((item => item.closest("[data-tabs]") === tabsBlock));
            tabsTitles = Array.from(tabsTitles).filter((item => item.closest("[data-tabs]") === tabsBlock));
            tabsContent.forEach(((tabsContentItem, index) => {
               if (tabsTitles[index].classList.contains("_tab-active")) {
                  if (tabsBlockAnimate) _slideDown(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = false;
                  if (isHash && !tabsContentItem.closest(".popup")) setHash(`tab-${tabsBlockIndex}-${index}`);
               } else if (tabsBlockAnimate) _slideUp(tabsContentItem, tabsBlockAnimate); else tabsContentItem.hidden = true;
            }));
         }
      }
      function setTabsAction(e) {
         const el = e.target;
         if (el.closest("[data-tabs-title]")) {
            const tabTitle = el.closest("[data-tabs-title]");
            const tabsBlock = tabTitle.closest("[data-tabs]");
            if (!tabTitle.classList.contains("_tab-active") && !tabsBlock.querySelector("._slide")) {
               let tabActiveTitle = tabsBlock.querySelectorAll("[data-tabs-title]._tab-active");
               tabActiveTitle.length ? tabActiveTitle = Array.from(tabActiveTitle).filter((item => item.closest("[data-tabs]") === tabsBlock)) : null;
               tabActiveTitle.length ? tabActiveTitle[0].classList.remove("_tab-active") : null;
               tabTitle.classList.add("_tab-active");
               setTabsStatus(tabsBlock);
            }
            e.preventDefault();
         }
      }
   }
   /*меню бургер пока*/
   function menuInit() {
      if (document.querySelector(".icon-menu")) document.addEventListener("click", (function (e) {
         if (bodyLockStatus && e.target.closest(".icon-menu")) {
            bodyLockToggle();
            document.documentElement.classList.toggle("menu-open");
         }
      }));
   }
   /*закрытие*/
   function menuClose() {
      bodyUnlock();
      document.documentElement.classList.remove("menu-open");
   }
   /*Консоль*/
   function FLS(message) {
      setTimeout((() => {
         if (window.FLS) console.log(message);
      }), 0);
   }
   /*Удаления дубликатов из массива*/
   function uniqArray(array) {
      return array.filter((function (item, index, self) {
         return self.indexOf(item) === index;
      }));
   }
   /*Для обработки медиа-запросов на основе данных, содержащихся в атрибутах data-* элементов*/
   function dataMediaQueries(array, dataSetValue) {
      const media = Array.from(array).filter((function (item, index, self) {
         if (item.dataset[dataSetValue]) return item.dataset[dataSetValue].split(",")[0];
      }));
      if (media.length) {
         const breakpointsArray = [];
         media.forEach((item => {
            const params = item.dataset[dataSetValue];
            const breakpoint = {};
            const paramsArray = params.split(",");
            breakpoint.value = paramsArray[0];
            breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
            breakpoint.item = item;
            breakpointsArray.push(breakpoint);
         }));
         let mdQueries = breakpointsArray.map((function (item) {
            return "(" + item.type + "-width: " + item.value + "px)," + item.value + "," + item.type;
         }));
         mdQueries = uniqArray(mdQueries);
         const mdQueriesArray = [];
         if (mdQueries.length) {
            mdQueries.forEach((breakpoint => {
               const paramsArray = breakpoint.split(",");
               const mediaBreakpoint = paramsArray[1];
               const mediaType = paramsArray[2];
               const matchMedia = window.matchMedia(paramsArray[0]);
               const itemsArray = breakpointsArray.filter((function (item) {
                  if (item.value === mediaBreakpoint && item.type === mediaType) return true;
               }));
               mdQueriesArray.push({
                  itemsArray,
                  matchMedia
               });
            }));
            return mdQueriesArray;
         }
      }
   }
   /*Прокрутка*/
   let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
      const targetBlockElement = document.querySelector(targetBlock);
      if (targetBlockElement) {
         let headerItem = "";
         let headerItemHeight = 0;
         if (noHeader) {
            headerItem = "header.header";
            const headerElement = document.querySelector(headerItem);
            if (!headerElement.classList.contains("_header-scroll")) {
               headerElement.style.cssText = `transition-duration: 0s;`;
               headerElement.classList.add("_header-scroll");
               headerItemHeight = headerElement.offsetHeight;
               headerElement.classList.remove("_header-scroll");
               setTimeout((() => {
                  headerElement.style.cssText = ``;
               }), 0);
            } else headerItemHeight = headerElement.offsetHeight;
         }
         let options = {
            speedAsDuration: true,
            speed,
            header: headerItem,
            offset: offsetTop,
            easing: "easeOutQuad"
         };
         document.documentElement.classList.contains("menu-open") ? menuClose() : null;
         if (typeof SmoothScroll !== "undefined") (new SmoothScroll).animateScroll(targetBlockElement, "", options); else {
            let targetBlockElementPosition = targetBlockElement.getBoundingClientRect().top + scrollY;
            targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
            targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
            window.scrollTo({
               top: targetBlockElementPosition,
               behavior: "smooth"
            });
         }
         FLS(`[gotoBlock]: Прокрутка до: ${targetBlock}`);
      } else FLS(`[gotoBlock]: Такого блока нет на странице: ${targetBlock}`);
   };
   /*Для инициализации полей формы с возможностью просмотра пароля и автоматической регулировки высоты текстовых полей*/
   function formFieldsInit(options = {
      viewPass: false,
      autoHeight: false
   }) {
      document.body.addEventListener("focusin", (function (e) {
         const targetElement = e.target;
         if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
            if (!targetElement.hasAttribute("data-no-focus-classes")) {
               targetElement.classList.add("_form-focus");
               targetElement.parentElement.classList.add("_form-focus");
            }
            formValidate.removeError(targetElement);
            targetElement.hasAttribute("data-validate") ? formValidate.removeError(targetElement) : null;
         }
      }));
      document.body.addEventListener("focusout", (function (e) {
         const targetElement = e.target;
         if (targetElement.tagName === "INPUT" || targetElement.tagName === "TEXTAREA") {
            if (!targetElement.hasAttribute("data-no-focus-classes")) {
               targetElement.classList.remove("_form-focus");
               targetElement.parentElement.classList.remove("_form-focus");
            }
            targetElement.hasAttribute("data-validate") ? formValidate.validateInput(targetElement) : null;
         }
      }));
      if (options.viewPass) document.addEventListener("click", (function (e) {
         let targetElement = e.target;
         if (targetElement.closest('[class*="__viewpass"]')) {
            let inputType = targetElement.classList.contains("_viewpass-active") ? "password" : "text";
            targetElement.parentElement.querySelector("input").setAttribute("type", inputType);
            targetElement.classList.toggle("_viewpass-active");
         }
      }));
      if (options.autoHeight) {
         const textareas = document.querySelectorAll("textarea[data-autoheight]");
         if (textareas.length) {
            textareas.forEach((textarea => {
               const startHeight = textarea.hasAttribute("data-autoheight-min") ? Number(textarea.dataset.autoheightMin) : Number(textarea.offsetHeight);
               const maxHeight = textarea.hasAttribute("data-autoheight-max") ? Number(textarea.dataset.autoheightMax) : 1 / 0;
               setHeight(textarea, Math.min(startHeight, maxHeight));
               textarea.addEventListener("input", (() => {
                  if (textarea.scrollHeight > startHeight) {
                     textarea.style.height = `auto`;
                     setHeight(textarea, Math.min(Math.max(textarea.scrollHeight, startHeight), maxHeight));
                  }
               }));
            }));
            function setHeight(textarea, height) {
               textarea.style.height = `${height}px`;
            }
         }
      }
   }
   /*Содержит методы для валидации полей формы и обработки ошибок*/
   let formValidate = {
      getErrors(form) {
         let error = 0;
         let formRequiredItems = form.querySelectorAll("*[data-required]");
         if (formRequiredItems.length) formRequiredItems.forEach((formRequiredItem => {
            if ((formRequiredItem.offsetParent !== null || formRequiredItem.tagName === "SELECT") && !formRequiredItem.disabled) error += this.validateInput(formRequiredItem);
         }));
         return error;
      },
      validateInput(formRequiredItem) {
         let error = 0;
         if (formRequiredItem.dataset.required === "email") {
            formRequiredItem.value = formRequiredItem.value.replace(" ", "");
            if (this.emailTest(formRequiredItem)) {
               this.addError(formRequiredItem);
               error++;
            } else this.removeError(formRequiredItem);
         } else if (formRequiredItem.type === "checkbox" && !formRequiredItem.checked) {
            this.addError(formRequiredItem);
            error++;
         } else if (!formRequiredItem.value.trim()) {
            this.addError(formRequiredItem);
            error++;
         } else this.removeError(formRequiredItem);
         return error;
      },
      addError(formRequiredItem) {
         formRequiredItem.classList.add("_form-error");
         formRequiredItem.parentElement.classList.add("_form-error");
         let inputError = formRequiredItem.parentElement.querySelector(".form__error");
         if (inputError) formRequiredItem.parentElement.removeChild(inputError);
         if (formRequiredItem.dataset.error) formRequiredItem.parentElement.insertAdjacentHTML("beforeend", `<div class="form__error">${formRequiredItem.dataset.error}</div>`);
      },
      removeError(formRequiredItem) {
         formRequiredItem.classList.remove("_form-error");
         formRequiredItem.parentElement.classList.remove("_form-error");
         if (formRequiredItem.parentElement.querySelector(".form__error")) formRequiredItem.parentElement.removeChild(formRequiredItem.parentElement.querySelector(".form__error"));
      },
      formClean(form) {
         form.reset();
         setTimeout((() => {
            let inputs = form.querySelectorAll("input,textarea");
            for (let index = 0; index < inputs.length; index++) {
               const el = inputs[index];
               el.parentElement.classList.remove("_form-focus");
               el.classList.remove("_form-focus");
               formValidate.removeError(el);
            }
            let checkboxes = form.querySelectorAll(".checkbox__input");
            if (checkboxes.length > 0) for (let index = 0; index < checkboxes.length; index++) {
               const checkbox = checkboxes[index];
               checkbox.checked = false;
            }
            if (flsModules.select) {
               let selects = form.querySelectorAll(".select");
               if (selects.length) for (let index = 0; index < selects.length; index++) {
                  const select = selects[index].querySelector("select");
                  flsModules.select.selectBuild(select);
               }
            }
         }), 0);
      },
      emailTest(formRequiredItem) {
         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(formRequiredItem.value);
      }
   };
   /*Обработка отправки форм на странице*/
   function formSubmit() {
      const forms = document.forms;
      if (forms.length) for (const form of forms) {
         form.addEventListener("submit", (function (e) {
            const form = e.target;
            formSubmitAction(form, e);
         }));
         form.addEventListener("reset", (function (e) {
            const form = e.target;
            formValidate.formClean(form);
         }));
      }
      async function formSubmitAction(form, e) {
         const error = !form.hasAttribute("data-no-validate") ? formValidate.getErrors(form) : 0;
         if (error === 0) {
            const ajax = form.hasAttribute("data-ajax");
            if (ajax) {
               e.preventDefault();
               const formAction = form.getAttribute("action") ? form.getAttribute("action").trim() : "#";
               const formMethod = form.getAttribute("method") ? form.getAttribute("method").trim() : "GET";
               const formData = new FormData(form);
               form.classList.add("_sending");
               const response = await fetch(formAction, {
                  method: formMethod,
                  body: formData
               });
               if (response.ok) {
                  let responseResult = await response.json();
                  form.classList.remove("_sending");
                  formSent(form, responseResult);
               } else {
                  alert("Помилка");
                  form.classList.remove("_sending");
               }
            } else if (form.hasAttribute("data-dev")) {
               e.preventDefault();
               formSent(form);
            }
         } else {
            e.preventDefault();
            if (form.querySelector("._form-error") && form.hasAttribute("data-goto-error")) {
               const formGoToErrorClass = form.dataset.gotoError ? form.dataset.gotoError : "._form-error";
               gotoBlock(formGoToErrorClass, true, 1e3);
            }
         }
      }
      function formSent(form, responseResult = ``) {
         document.dispatchEvent(new CustomEvent("formSent", {
            detail: {
               form
            }
         }));
         setTimeout((() => {
            if (flsModules.popup) {
               const popup = form.dataset.popupMessage;
               popup ? flsModules.popup.open(popup) : null;
            }
         }), 0);
         formValidate.formClean(form);
         formLogging(`Форма отправлена!`);
      }
      function formLogging(message) {
         FLS(`[Форма]: ${message}`);
      }
   }
   let addWindowScrollEvent = false;
   /*Навигация к блоку*/
   function pageNavigation() {
      document.addEventListener("click", pageNavigationAction);
      document.addEventListener("watcherCallback", pageNavigationAction);
      function pageNavigationAction(e) {
         if (e.type === "click") {
            const targetElement = e.target;
            if (targetElement.closest("[data-goto]")) {
               const gotoLink = targetElement.closest("[data-goto]");
               const gotoLinkSelector = gotoLink.dataset.goto ? gotoLink.dataset.goto : "";
               const noHeader = gotoLink.hasAttribute("data-goto-header") ? true : false;
               const gotoSpeed = gotoLink.dataset.gotoSpeed ? gotoLink.dataset.gotoSpeed : 500;
               const offsetTop = gotoLink.dataset.gotoTop ? parseInt(gotoLink.dataset.gotoTop) : 0;
               if (flsModules.fullpage) {
                  const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest("[data-fp-section]");
                  const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.fpId : null;
                  if (fullpageSectionId !== null) {
                     flsModules.fullpage.switchingSection(fullpageSectionId);
                     document.documentElement.classList.contains("menu-open") ? menuClose() : null;
                  }
               } else gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
               e.preventDefault();
            }
         } else if (e.type === "watcherCallback" && e.detail) {
            const entry = e.detail.entry;
            const targetElement = entry.target;
            if (targetElement.dataset.watch === "navigator") {
               document.querySelector(`[data-goto]._navigator-active`);
               let navigatorCurrentItem;
               if (targetElement.id && document.querySelector(`[data-goto="#${targetElement.id}"]`)) navigatorCurrentItem = document.querySelector(`[data-goto="#${targetElement.id}"]`); else if (targetElement.classList.length) for (let index = 0; index < targetElement.classList.length; index++) {
                  const element = targetElement.classList[index];
                  if (document.querySelector(`[data-goto=".${element}"]`)) {
                     navigatorCurrentItem = document.querySelector(`[data-goto=".${element}"]`);
                     break;
                  }
               }
               if (entry.isIntersecting) navigatorCurrentItem ? navigatorCurrentItem.classList.add("_navigator-active") : null; else navigatorCurrentItem ? navigatorCurrentItem.classList.remove("_navigator-active") : null;
            }
         }
      }
      if (getHash()) {
         let goToHash;
         if (document.querySelector(`#${getHash()}`)) goToHash = `#${getHash()}`; else if (document.querySelector(`.${getHash()}`)) goToHash = `.${getHash()}`;
         goToHash ? gotoBlock(goToHash, true, 500, 20) : null;
      }
   }
   /*Отложить выполнение до следующего цикла событий*/
   setTimeout((() => {
      if (addWindowScrollEvent) {
         let windowScroll = new Event("windowScroll");
         window.addEventListener("scroll", (function (e) {
            document.dispatchEvent(windowScroll);
         }));
      }
   }), 0);
   /*Глобальная переменная fls*/
   window["FLS"] = true;
   /*Динамический адаптив*/
   class DynamicAdapt {
      constructor(type) {
         this.type = type
      }
      init() {
         this.оbjects = []
         this.daClassname = '_dynamic_adapt_'
         this.nodes = [...document.querySelectorAll('[data-da]')]
         this.nodes.forEach((node) => {
            const data = node.dataset.da.trim()
            const dataArray = data.split(',')
            const оbject = {}
            оbject.element = node
            оbject.parent = node.parentNode
            оbject.destination = document.querySelector(`${dataArray[0].trim()}`)
            оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767'
            оbject.place = dataArray[2] ? dataArray[2].trim() : 'last'
            оbject.index = this.indexInParent(оbject.parent, оbject.element)
            this.оbjects.push(оbject)
         })

         this.arraySort(this.оbjects)

         this.mediaQueries = this.оbjects
            .map(({ breakpoint }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`)
            .filter((item, index, self) => self.indexOf(item) === index)
         this.mediaQueries.forEach((media) => {
            const mediaSplit = media.split(',')
            const matchMedia = window.matchMedia(mediaSplit[0])
            const mediaBreakpoint = mediaSplit[1]
            const оbjectsFilter = this.оbjects.filter(({ breakpoint }) => breakpoint === mediaBreakpoint)
            matchMedia.addEventListener('change', () => {
               this.mediaHandler(matchMedia, оbjectsFilter)
            })
            this.mediaHandler(matchMedia, оbjectsFilter)
         })
      }
      mediaHandler(matchMedia, оbjects) {
         if (matchMedia.matches) {
            оbjects.forEach((оbject) => {
               this.moveTo(оbject.place, оbject.element, оbject.destination)
            })
         } else {
            оbjects.forEach(({ parent, element, index }) => {
               if (element.classList.contains(this.daClassname)) {
                  this.moveBack(parent, element, index)
               }
            })
         }
      }
      moveTo(place, element, destination) {
         element.classList.add(this.daClassname)
         if (place === 'last' || place >= destination.children.length) {
            destination.append(element)
            return
         }
         if (place === 'first') {
            destination.prepend(element)
            return
         }
         destination.children[place].before(element)
      }
      moveBack(parent, element, index) {
         element.classList.remove(this.daClassname)
         if (parent.children[index] !== undefined) {
            parent.children[index].before(element)
         } else {
            parent.append(element)
         }
      }
      indexInParent(parent, element) {
         return [...parent.children].indexOf(element)
      }
      arraySort(arr) {
         if (this.type === 'min') {
            arr.sort((a, b) => {
               if (a.breakpoint === b.breakpoint) {
                  if (a.place === b.place) {
                     return 0
                  }
                  if (a.place === 'first' || b.place === 'last') {
                     return -1
                  }
                  if (a.place === 'last' || b.place === 'first') {
                     return 1
                  }
                  return 0
               }
               return a.breakpoint - b.breakpoint
            })
         } else {
            arr.sort((a, b) => {
               if (a.breakpoint === b.breakpoint) {
                  if (a.place === b.place) {
                     return 0
                  }
                  if (a.place === 'first' || b.place === 'last') {
                     return 1
                  }
                  if (a.place === 'last' || b.place === 'first') {
                     return -1
                  }
                  return 0
               }
               return b.breakpoint - a.breakpoint
            })
            return
         }
      }
   }
   const da = new DynamicAdapt("max");
   da.init();
   isWebp();
   menuInit();
   spollers();
   tabs();
   pageNavigation();
})();