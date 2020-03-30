Element.prototype.appendAfter = function (element) {
  element.parentNode.insertBefore(this, element.nextSibling)
};

function noop() {}

function _createModalFooter(buttons = []) {
  if (!buttons.length) {
    return document.createElement('div')
  }

  const wrap = document.createElement('div');
  wrap.classList.add('modal-footer');

  buttons.forEach(btn => {
    const $btn = document.createElement('button');
    $btn.textContent = btn.text;
    $btn.classList.add(`btn-${btn.type || 'secondary'}`);
    $btn.onclick = btn.handler || noop

    wrap.appendChild($btn)
  });

  return wrap;
}

function _createModal(options) {
  const modal = document.createElement('div');
  modal.classList.add('vmodal');
  modal.insertAdjacentHTML('afterbegin', `
  <div class="modal-overlay" data-close="true">
    <div class="modal-window">
      <div class="modal-header">
        <span class="modal-title">${options.title || "Окно"}</span>
        ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
      </div>
      <div class="modal-body" data-content>
        ${options.content || ''}
      </div>
    </div>
  </div>
  `);

  const footer = _createModalFooter(options.footerButtons)
  footer.appendAfter(modal.querySelector('[data-content]'));

  if (options.width) {
    modal.getElementsByClassName('modal-window')[0].style.width = options.width;
  }

  document.body.appendChild(modal);
  return modal;
}

/*
* 1 Показать цену в модалке
* 2 Динамически вывести список карточек
* 3 Удалить - показать модалку - вы действительно хотите удалить?
* ========
* 4 При удалении удаляется и карточка дом дерева: на основе плагина modal сделать $/confirm
* */
$.modal = function (options) {
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options);

  let closing = false;
  let destroyed = false;
  let opened = false;

  const modal = {
    open() {
      if (destroyed) {
        return console.log('Modal is destroyed')
      }
      !closing && $modal.classList.add('open');
      opened = true;
    },
    close() {
      if (!opened) return;

      closing = true;

      $modal.classList.remove('open');
      $modal.classList.add('hide');
      setTimeout(() => {
        $modal.classList.remove('hide');
        closing = false;
        opened = false;

      }, ANIMATION_SPEED)
    }
  };

  const listener = event => {
    if (event.target.dataset.close) {
      modal.close()
    }
  };

  $modal.addEventListener('click', listener);

  return Object.assign(modal, {
    destroy() {
      $modal.removeEventListener('click', listener);
      $modal.parentNode.removeChild($modal);
      destroyed = true
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html
    }
  });
};

