## Build Setup

``` bash
# install dependencies
npm install

# start app

npm start
```


Изначально localStorage отключен, т.к. возникли проблемы при взаимодействии его и пагинации. 
Чтобы подключить localStorage достаточно убрать // в 146 строке файла ListOfCompanies, предварительно добавив что-то в список. 

Для увелечения количества компаний на странице нужно изменить директиву ``` :items-per-page="4" ``` в файле ListOfCompanies, предварительно добавив их в массив companies. 
