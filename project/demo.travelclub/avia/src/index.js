import React, {Suspense, lazy} from 'react';
import ReactDOM from 'react-dom';
import Preloader from './components/loader';
import './index.scss';

import Form from './container/form';

import Filter from './container/filter';
//import moment from 'moment';
import * as serviceWorker from './serviceWorker';

const Result = lazy(() => import('./container/result'));
const Sort = lazy(() => import('./container/sort'));
//const Sort = lazy(() => import('./container/sort'));

//const Sort = lazy(() => import('./container/sort'));
//ReactDOM.render(<Form/>, document.getElementById('AviaAppForm'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


class AviaApp {
    constructor(rootElem, typeElem, langElem, defaultData) {
        this.rootElem = {
            elem: rootElem || null,
            type: typeElem || null,
            lang: langElem || null,
            defaultData: defaultData || null,
            query: null
        };
        this.queryParam = defaultData;
    }

    get _rootElem() {
        return this.rootElem;
    }

    set _rootElem(newValue) {
        if (newValue) {
            console.log(newValue);
            this.rootElem = newValue;
            this.initReact();
        }
    }


    initReact = () => {
        if (this.rootElem) {
            switch (this.rootElem.type) {
                case 'Form':
                    ReactDOM.hydrate(<Form lang={this.rootElem.lang}
                                           query={this.rootElem.query}
                                           defaultData={this.rootElem.defaultData}/>
                                           , this.rootElem.elem);
                    break;
                case 'Filter':
                    ReactDOM.hydrate(<Filter
                        lang={this.rootElem.lang}
                        query={this.rootElem.query}
                        defaultData={this.rootElem.defaultData}
                    />, this.rootElem.elem);
                    break;
                case 'Sort':

                    ReactDOM.hydrate(
                        <Suspense fallback={<div><Preloader/></div>}>
                            <Sort/></Suspense>
                        ,this.rootElem.elem)
                    break;
                case 'Result':
                    ReactDOM.hydrate(
                        <Suspense fallback={<div><Preloader/></div>}>
                            <Result lang={this.rootElem.lang} query={this.rootElem.query} lang={this.rootElem.lang}/>
                        </Suspense>
                        , this.rootElem.elem);
                    break;
                default:
                    alert('no init');
                    break;
            }
        }
    }
}


//form
window.AviaApp = new AviaApp();
const app = new AviaApp();
app._rootElem = {
    elem: document.querySelector('#AviaAppForm'),
    type: 'Form',
    lang: {
        FROM: "Откуда",
        TO: "Куда",
        DATE_FROM: "Дата вылета",
        DATE_TO: "Дата вылета обратно",
        PESSENGERS: "Пассажиры и класс",
        PESSENGER: "Пассажиры",
        ADULTS: "Взрослых",
        ADULTS_INFO: "от 14 и старше",
        ONE_ADULT: "Взрослый",
        CHILDREN: "Детей",
        CHILDREN_INFO: "от 2 до 14",
        ONE_CHILD: "Ребенок",
        BABIES: "Младенцев",
        BABIES_INFO: "от 2 до 14",
        ONE_BABY: "Младенец",
        SUBMIT: "Найти",
        OK_BTN: "OK",
        CLASS_BUSINESS:"Бизнес",
        CLASS_ECONOMY:"Эконом",
        CLASS_FIST:"Первый класс",
        PREMIUMECONOMY:"Премиум эконом"
    },

    defaultData: {
        CLASSES:['Economy','Business','First','PremiumEconomy'],
        REQUEST: null,
        IS_AJAX_MODE: window.location.href == window.location.origin ? "N" : "Y",
        DATE_FORMAT: 'DD.MM.YYYY',
        SEARCH_DATA: {
            DEPARTURE: [
                {
                    ID: "1779",
                    UF_CODE: "DME",
                    UF_CITY_RU: "Москва",
                    UF_CITY_EN: "Moscow",
                    UF_NAME_RU: "Домодедово",
                    UF_NAME_EN: "Domodedovo",
                    UF_AREA: "MOW",
                    UF_COUNTRY: "RU",
                    UF_TIMEZONE: "Europe/Moscow",
                    UF_LAT: "55.4145",
                    UF_LNG: "37.8999",
                    INPUT_NAME: "airport:1779",
                    CITY_RU_ID: "Москва~RU",
                    CITY_INPUT_NAME_RU: "city:Москва~RU",
                    CITY_EN_ID: "Moscow~RU",
                    CITY_INPUT_NAME_EN: "city:Moscow~RU",
                    OBJECT_TYPE: "city",
                }
            ],
            ARRIVAL: [
                {
                    ID: "2159",
                    UF_CODE: "EWR",
                    UF_CITY_RU: "Нью-Йорк",
                    UF_CITY_EN: "New-York",
                    UF_NAME_RU: "Ньюарк Либерти",
                    UF_NAME_EN: "Newark Liberty",
                    UF_AREA: "NYC",
                    UF_COUNTRY: "US",
                    UF_TIMEZONE: "America/New_York",
                    UF_LAT: "40.69709",
                    UF_LNG: "-74.17557",
                    INPUT_NAME: "airport:2159",
                    CITY_RU_ID: "Нью-Йорк~US",
                    CITY_INPUT_NAME_RU: "city:Нью-Йорк~US",
                    CITY_EN_ID: "New-York~US",
                    CITY_INPUT_NAME_EN: "city:New-York~US",
                    OBJECT_TYPE: "city",
                }
            ],
            DATE_DEPARTURE: "30.01.2020",
           // DATE_ARRIVAL: "22.01.2020",
            PESSANGER: {
                adults: 3,
                children: 0,
                baby: 0
            },
            CLASSES:['Economy']
        }

    },
    query: {
        URL_DATA_FROM: 'http://travelclub.travelsoft.by/local/components/travelsoft/nemoconnect.search.form/templates/.default/ajax/from.php',
        URL_DATA_TO: 'http://travelclub.travelsoft.by/local/components/travelsoft/nemoconnect.search.form/templates/.default/ajax/to.php',
    }
}


app._rootElem = {
    elem: document.getElementById("AviaAppSort"),
    type: 'Sort',
};
app._rootElem ={
    elem: document.getElementById("AviaAppFilter"),
    type: 'Filter',
    lang: {
        am:'До полудня',
        e: 'Обеденное время',
        m:'После полудня'
    },
    defaultData: {
        CLASSES:['Economy','Business','First','PremiumEconomy'],
        REQUEST: null,
        IS_AJAX_MODE: window.location.href == window.location.origin ? "N" : "Y",
        DATE_FORMAT: 'DD.MM.YYYY',
        SEARCH_DATA: {
            DEPARTURE: [
                {
                    ID: "1779",
                    UF_CODE: "DME",
                    UF_CITY_RU: "Москва",
                    UF_CITY_EN: "Moscow",
                    UF_NAME_RU: "Домодедово",
                    UF_NAME_EN: "Domodedovo",
                    UF_AREA: "MOW",
                    UF_COUNTRY: "RU",
                    UF_TIMEZONE: "Europe/Moscow",
                    UF_LAT: "55.4145",
                    UF_LNG: "37.8999",
                    INPUT_NAME: "airport:1779",
                    CITY_RU_ID: "Москва~RU",
                    CITY_INPUT_NAME_RU: "city:Москва~RU",
                    CITY_EN_ID: "Moscow~RU",
                    CITY_INPUT_NAME_EN: "city:Moscow~RU",
                    OBJECT_TYPE: "city",
                }
            ],
            ARRIVAL: [
                {
                    ID: "2159",
                    UF_CODE: "EWR",
                    UF_CITY_RU: "Нью-Йорк",
                    UF_CITY_EN: "New-York",
                    UF_NAME_RU: "Ньюарк Либерти",
                    UF_NAME_EN: "Newark Liberty",
                    UF_AREA: "NYC",
                    UF_COUNTRY: "US",
                    UF_TIMEZONE: "America/New_York",
                    UF_LAT: "40.69709",
                    UF_LNG: "-74.17557",
                    INPUT_NAME: "airport:2159",
                    CITY_RU_ID: "Нью-Йорк~US",
                    CITY_INPUT_NAME_RU: "city:Нью-Йорк~US",
                    CITY_EN_ID: "New-York~US",
                    CITY_INPUT_NAME_EN: "city:New-York~US",
                    OBJECT_TYPE: "city",
                }
            ],
            DATE_DEPARTURE: "30.01.2020",
            // DATE_ARRIVAL: "22.01.2020",
            PESSANGER: {
                adults: 3,
                children: 0,
                baby: 0
            },
            CLASSES:['Economy']
        }

    },
};
console.log(app._rootElem)
app._rootElem = {
    elem: document.getElementById("AviaAppResult"),
    type: 'Result',
    lang: {
        FROM: "Откуда",
        TO: "Куда",
        DATE_FROM: "Дата вылета",
        DATE_TO: "Дата вылета обратно",
        PESSENGERS: "Пассажиры и класс",
        PESSENGER: "Пассажиры",
        ADULTS: "Взрослых",
        ADULTS_INFO: "от 14 и старше",
        ONE_ADULT: "Взрослый",
        CHILDREN: "Детей",
        CHILDREN_INFO: "от 2 до 14",
        ONE_CHILD: "Ребенок",
        BABIES: "Младенцев",
        BABIES_INFO: "от 2 до 14",
        ONE_BABY: "Младенец",
        SUBMIT: "Найти",
        OK_BTN: "OK",
        CLASS_BUSINESS:"Бизнес",
        CLASS_ECONOMY:"Эконом",
        CLASS_FIST:"Первый класс",
        PREMIUMECONOMY:"Премиум эконом"
    },
    defaultData:{
    },
    query:{
        INIT_DATA:'http://travelclub.travelsoft.by/local/components/travelsoft/nemoconnect.search.result/templates/.default/ajax/search.php',
        OPERATION_DATA:'http://travelclub.travelsoft.by/local/components/travelsoft/nemoconnect.search.result/templates/.default/ajax/operations.php'
    }
}



// app.initReact();


//     AviaApp.initReact();
//
//    //result
// AviaApp._rootElem ={
//     elem: document.querySelector('#AviaAppResult'),
//     type: 'Result',
//     lang: {
//         FROM:{
//             label:"from",
//             placeholder: "set from",
//             popper:"set from",
//             button:"select"
//         }
//     }};
// AviaApp.initReact();





