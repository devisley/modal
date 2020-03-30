const fruits = [
  {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
  {id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
  {id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'},
];

let modal = $.modal({
  title: `<b>Это мое модальное окно</b>`,
  closable: true,
  content: `<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, autem blanditiis commodi consequatur corporis cumque dolore dolores earum est excepturi hic illum ipsa magnam minima necessitatibus odio officiis porro qui recusandae soluta unde, voluptates voluptatibus? Facilis officiis quaerat ratione recusandae ut? Amet architecto autem culpa ea excepturi expedita, fuga itaque officiis praesentium similique vel vitae. Deleniti enim explicabo fuga nobis pariatur perspiciatis quidem, reiciendis sed similique sint vero voluptas voluptatibus. Beatae cupiditate dolore, facere facilis id illo minima placeat porro possimus quod saepe velit. A aliquid beatae consequuntur distinctio dolorum expedita, inventore itaque, laborum nemo nostrum perspiciatis quam tempore, voluptatem!</p><i>Lorem ipsum dolor.</i>`,
  width: '50%',
  footerButtons: [
    {text: 'Ok', type: 'primary', handler() {
        console.log("Primary btn clicked")
        modal.close()
      }},
    {text: 'Cancel', type: 'danger', handler() {
        console.log("Cancel btn clicked")
        modal.close()
      }}
  ]
});

const fruitsNode = $.fruits(fruits);
fruitsNode.show();
