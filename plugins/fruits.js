function _createFruitCard(fruit) {
  const $fruitCard = document.createElement('div');
  $fruitCard.classList.add('card');

  $fruitCard.insertAdjacentHTML('afterbegin', `
    <img style="height: 300px" src="${fruit.img}" class="card-img-top" alt="card">
    <div class="card-body">
      <h5 class="card-title">${fruit.title}</h5>
      <a href="#" class="btn btn-primary" data-price-id="${fruit.id}">Посмотреть цену</a>
      <a href="#" class="btn btn-danger" data-remove-id="${fruit.id}">Удалить</a>
    </div>
  `);

  return $fruitCard
}

const _getString = (function() {
  const DIV = document.createElement("div");

  if ('outerHTML' in DIV)
    return function(node) {
      return node.outerHTML;
    };

  return function(node) {
    const div = DIV.cloneNode();
    div.appendChild(node.cloneNode(true));
    return div.innerHTML;
  };

})();


function _createFruitsNode(fruits) {
  const $fruitsNode = document.createElement('div');
  $fruitsNode.classList.add('row', 'fruits');

  fruits.forEach(fruit => {
    const $fruit = document.createElement('div');
    $fruit.classList.add('col');
    $fruit.appendChild(_createFruitCard(fruit));

    $fruitsNode.appendChild($fruit);
  });

  return $fruitsNode;
}

// Возвращает объект
$.fruits = function (fruits) {

  let showed = false;
  const $fruits = fruits;
  const $fruitsNode = _createFruitsNode($fruits);

  const fruitsInterface = {
    getPriceById(id = 0) {

      if ($fruits.length === 0) return;
      const fruit = this.getFruitById(id);

      if (fruit) {
        return fruit.price
      }

      return console.log('Элемент с данным ID в масииве не наден');
    },

    getFruitById(id = 0) {
      return $fruits.find(fruit => fruit.id === id);
    },

    deleteById() {}
  };

  const listener = event => {
    event.preventDefault();

    if (event.target.dataset.priceId) {
      modal.destroy();

      const id = +event.target.dataset.priceId;
      const fruit = fruitsInterface.getFruitById(id);

      // Показываем модалку с ценой
      modal = $.modal({
        title: 'Показ цены',
        closable: true,
        content: `<img style="height: 300px" src="${fruit.img}" class="card-img-top" alt="card">` + `<h4>Цена: ${fruit.price}</h4>`,
        footerButtons: [
          {text: 'Ok', type: 'primary', handler() {
              modal.close()
            }},
        ]
      });
      modal.open()
    } else if (event.target.dataset.removeId) {
      const id = +event.target.dataset.removeId;
      const fruit = fruitsInterface.getFruitById(id);
      // Показываем модалку с удалением
      modal = $.modal({
        title: `Вы действительно желаете удалить ${fruit.title} ?`,
        closable: true,
        content: `<img style="height: 300px" src="${fruit.img}" class="card-img-top" alt="card">`,
        footerButtons: [
          {text: 'Да', type: 'danger', handler() {
              modal.close()
            }},
          {text: 'Нет', type: 'primary', handler() {
              modal.close()
            }}
        ]
      });
      modal.open()

    }
  };

  $fruitsNode.addEventListener('click', listener);

  return Object.assign(fruitsInterface, {
    show() {
      if (showed) return;
      document.querySelector('.container').appendChild($fruitsNode);
      showed = true;
    },
  });
};
