const Mail = require('./lib/mail');
const http = require("http");

http.createServer((request, response) => {
  const { method, url } = request;

  if (method === 'POST' && url === '/api/application') {
    let body = [];

    response.setHeader('Access-Control-Allow', '*');
    response.setHeader('Access-Control-Expose-Headers', 'Content-Length,API-Key')
    response.setHeader('Access-Control-Request-Method',"POST");
    response.setHeader('Access-Control-Allow-Headers', 'POST');
    response.setHeader('Access-Control-Allow-Origin', '*');
    // response.setHeader('Access-Control-Max-Age', '')
    request.on('data', chunk => {
      body.push(chunk);
    })
    request.on('end', () => {
      const data = JSON.parse(Buffer.concat(body).toString());
      const mail = new Mail({
        to: 'vtlk881811@gmail.com',
        subject: 'Заказ на просчет',
        html: `<p>Имя заказчика: <b>${data.name}</b></p>
              <p>Телефон заказчика: <b>${data.phone}</b></p>
              <p>тип недвижемости: <b>${data.immovables === 'commercial'?'комерческая': 'житловая'}</b></p>
              <p>: Тип объекта:<b>
                ${data.type_build === 'new_living'?'ноовострой': ''}
                ${data.type_build === 'secend_living'?'вторичка': ''}
                ${data.type_build === 'cottag_living'?'котеж': ''}
              </b></p>
              <p>Площадь: <b>${data.area}</b></p>
              <p>Не помню площадь: <b>${data.is_not_remember}</b></p>
              <p>Количество комнат: <b>${data.total_room}</b></p>
              <p>Тип ремонта: <b>${data.repair === 'part'?'частичный': 'полный'}</b></p>
              <p>Есть дизайн: <b>
                ${data.is_desine === 'yes' ? 'да' : ''}
                ${data.is_desine === 'no'? 'нет': ''}
                ${data.is_desine === 'none'? 'мне нужен дизайн': ''}
              </b></p>
              <p>Как скоро нужно начать: <b>
                ${data.deadline === 'a' ? 'зависит от цены' : ''}
                ${data.deadline === 'b'? 'в течении недели': ''}
                ${data.deadline === 'c'? 'в течении месяца': ''}
              </b></p>
              `,
        successCallback: (suc) => {
          response.statusCode = 200;
          response.write(JSON.stringify({status: 200, message: 'Ok'}));
          response.end();
        },
        errorCallback: (err) => {
          response.statusCode = 500;
          response.write(JSON.stringify({status: 500, message: 'Server has error'}));
          response.end();
        }
      });
    
      mail.send();
    });
      
  } else {
    response.statusCode = 500;
    response.write(JSON.stringify({status: 500, message: 'Server has error'}));
    response.end();
  } 
}).listen(3555);
