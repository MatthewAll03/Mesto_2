(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{rF:()=>R,I4:()=>Y});var t={baseUrl:"https://nomoreparties.co/v1/wff-cohort-5",headers:{authorization:"edb16b97-6be0-4f78-a95a-c2433202f688","Content-Type":"application/json"}},n=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};var o=document.querySelector("#card-template").content;function r(e,t,n,r,a,i,u,l,s){var p=o.querySelector(".places__item").cloneNode(!0),d=p.querySelector(".card__like-button"),_=p.querySelector(".card__image"),f=p.querySelector(".card__like-counter"),y=p.querySelector(".card__delete-button");return p.querySelector(".card__title").textContent=e,_.src=t,_.alt=e,f.textContent=i.length,i.some((function(e){return e._id==s}))&&d.classList.add("card__like-button_is-active"),d.addEventListener("click",(function(){c(l,d,f)})),p.dataset.cardId=l,_.addEventListener("click",a),u?y.addEventListener("click",(function(){return Y(p)})):y.remove(),console.log(p),p}function c(e,o,r){var c,a,i;(c=e,a=o.classList.contains("card__like-button_is-active"),i=a?"DELETE":"PUT",fetch("".concat(t.baseUrl,"/cards/likes/").concat(c),{method:i,headers:{Authorization:"".concat(t.headers.authorization),"Content-Type":"application/json"}}).then(n)).then((function(e){r.textContent=e.likes.length,o.classList.toggle("card__like-button_is-active")}))}function a(e){e.classList.add("popup_is-animated"),e.classList.add("popup_is-opened"),window.addEventListener("keydown",u),e.addEventListener("click",l)}function i(e){e.classList.remove("popup_is-opened"),window.removeEventListener("keydown",u),e.removeEventListener("click",l),e.classList.remove("popup_is-animated")}function u(e){"Escape"===e.key&&i(document.querySelector(".popup_is-opened"))}function l(e){e.target.classList.contains("popup_is-opened")&&i(document.querySelector(".popup_is-opened"))}var s=document.querySelector(".popup__input_type_name"),p=document.querySelector(".popup__input_type_description"),d=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),f=function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""};function y(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){r.addEventListener("input",(function(){(function(e,t,n){t.validity.valid?f(e,t,n):function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.classList.add(n.errorClass),o.textContent=function(e){return e.validity.patternMismatch?e.dataset.errorMessage:e.validationMessage}(t)}(e,t,n)})(e,r,t),function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):v(t,n)}(n,o,t)}))}))}function m(e,t){e.querySelectorAll(t.inputSelector).forEach((function(n){f(e,n,t),n.value=""})),e.querySelectorAll(".".concat(t.inputErrorClass)).forEach((function(e){e.classList.remove(t.inputErrorClass)}));var n=e.querySelector(t.submitButtonSelector);v(n,t),e.querySelectorAll(t.inputSelector).forEach((function(e){e.value=""}))}var v=function(e,t){e.classList.add(t.inactiveButtonClass),e.disabled=!0};function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}var S,b=document.querySelector(".profile__edit-button"),q=document.querySelector(".popup_type_edit"),C=q.querySelector(".popup__close"),E=document.querySelector(".profile__image"),L=document.querySelector(".popup_type_confirm-delete"),g=L.querySelector(".popup__close"),k=null,x=L.querySelector(".popup__button_confirm-delete"),A=document.querySelector(".popup_type_confirm-delete"),w=document.querySelector(".profile__add-button"),j=document.querySelector(".popup_type_new-card"),z=j.querySelector(".popup__close"),T=document.querySelector(".popup_type_image"),O=document.querySelector(".popup__image"),U=document.querySelector(".popup__caption"),I=T.querySelector(".popup__close"),P=q.querySelector(".popup__form"),B=j.querySelector(".popup__form"),D=document.querySelector(".places__list"),M=document.querySelector(".popup__input_type_card-name"),N=document.querySelector(".popup__input_type_url"),J=document.querySelector(".places__list"),H=document.querySelector(".avatar__overlay"),F=document.querySelector(".popup_type_change_avatar"),$=F.querySelector(".popup__close"),G=F.querySelector(".popup__input_avatar"),K=F.querySelector(".popup__form"),Q=j.querySelector(".button"),R=q.querySelector(".button"),V=K.querySelector(".button"),W={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function X(e){a(T),O.src=e.target.src,U.textContent=e.target.closest(".card").querySelector(".card__title").textContent,O.alt=e.target.closest(".card").querySelector(".card__title").textContent}function Y(e){k=e,a(A)}w.addEventListener("click",(function(){m(B,W),a(j)})),z.addEventListener("click",(function(){i(j)})),H.addEventListener("click",(function(){m(K,W),a(F)})),$.addEventListener("click",(function(){i(F)})),K.addEventListener("submit",(function(e){!function(e){var o;e.preventDefault(),V.textContent="Сохранение...",(o=G.value,fetch("".concat(t.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:{Authorization:"".concat(t.headers.authorization),"Content-Type":"application/json"},body:JSON.stringify({avatar:o})}).then(n)).then((function(e){document.querySelector(".profile__image").style.backgroundImage="url('".concat(e.avatar,"')"),i(F)})).catch((function(e){console.log(e)})).finally((function(){return V.textContent="Да"}))}(e)})),P.addEventListener("submit",(function(e){e.preventDefault(),R.textContent="Сохранение...";var o=s.value,r=p.value;d.textContent=o,_.textContent=r,function(e,o){return fetch("".concat(t.baseUrl,"/users/me"),{method:"PATCH",headers:{authorization:"".concat(t.headers.authorization),"Content-Type":"application/json"},body:JSON.stringify({name:e,about:o})}).then(n)}(o,r).finally((function(){return R.textContent="Сохранить"})),i(e.target.closest(".popup"))})),B.addEventListener("submit",(function(e){var o,c;e.preventDefault(),Q.textContent="Сохранение..",(o=M.value,c=N.value,fetch("".concat(t.baseUrl,"/cards"),{method:"POST",headers:{authorization:"".concat(t.headers.authorization),"Content-Type":"application/json"},body:JSON.stringify({name:o,link:c})}).then(n)).then((function(e){var t=r(e.name,e.link,0,0,X,[],!0,e._id,e.owner._id);J.prepend(t)})).catch((function(e){console.log(e)})).finally((function(){return Q.textContent="Сохранить"})),i(e.target.closest(".popup"))})),I.addEventListener("click",(function(){return i(T)})),b.addEventListener("click",(function(){m(P,W),a(q),s.value=d.textContent,p.value=_.textContent})),C.addEventListener("click",(function(){i(q)})),x.addEventListener("click",(function(){var e,o;i(L),e=k,(o=k.dataset.cardId,fetch("".concat(t.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:{authorization:"".concat(t.headers.authorization),"Content-Type":"application/json"}})).then(n).then((function(){e.remove(),i(A)})).catch((function(e){console.error(e)}))})),g.addEventListener("click",(function(){return i(A)})),Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{headers:{authorization:"".concat(t.headers.authorization)}}).then(n),fetch("".concat(t.baseUrl,"/cards"),{headers:{authorization:"".concat(t.headers.authorization)}}).then(n)]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];d.textContent=c.name,_.textContent=c.about,E.style.backgroundImage="url('".concat(c.avatar,"')");var i=c._id;a.forEach((function(e){var t=e.owner._id===i;!function(e){D.append(e)}(r(e.name,e.link,0,0,X,e.likes,t,e._id,e.owner._id))}))})),S=W,Array.from(document.querySelectorAll(S.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),y(e,S)}))})();