import { randomUserMock, additionalUsers } from "./FE4U-Lab2-mock.js";
/** ******** Your code here! *********** */




// Функція для генерації випадкового значення зі списку
function getRandomValue(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}


// Функція для об'єднання об'єктів із позбавленням повторів
function mergeObjects(arr1, arr2) {
    const mergedObjects = [];

    // Об'єдную об'єкти з першого масиву
    for (const obj of arr1) {
        if (obj.full_name) {
            const duplicate = mergedObjects.find((item) => item.full_name === obj.full_name);
            if (!duplicate) {
                mergedObjects.push(obj);
            }
        }
    }

    // Об'єдную об'єкти з другого масиву
    for (const obj of arr2) {
        if (obj.full_name) {
            const duplicate = mergedObjects.find((item) => item.full_name === obj.full_name);
            if (!duplicate) {
                mergedObjects.push(obj);
            }
        }
    }
    return mergedObjects;
}
//Створюємо юзера з правильно переданими параметрами
function formatUser(user) {
    let formatedUser = {
        gender: user.gender,
        title: user.name.title,
        full_name: user.name.first + " " + user.name.last,
        city: user.location.city,
        state: user.location.state,
        country: user.location.country,
        postcode: user.location.postcode,
        coordinates: user.location.coordinates,
        timezone: user.location.timezone,
        email: user.email,
        b_date: user.dob.date,
        age: user.dob.age,
        phone: user.phone,
        picture_large: user.picture.large,
        picture_thumbnail: user.picture.thumbnail,
        id: "",
        favorite: false,
        course: getRandomValue([
            "Mathematics",
            "Physics",
            "English",
            "Computer Science",
            "Dancing",
            "Chess",
            "Biology",
            "Chemistry",
            "Law",
            "Art",
            "Medicine",
            "Statistics",
        ]),
        bg_color: "",
        note: "",

    }

    return formatedUser;
}
//чи валідний об'єкт user
function isValid(user) {
    return validString(user.full_name) &&
        validString(user.city) &&
        validString(user.state) &&
        validString(user.country) &&
        checkEmail(user.email) &&
        checkAge(user.age) &&
        validatePhone(user.phone, user.country)
        && (typeof (user.gender) === 'string');
}

//перевірка на валідність users
function checkValid(users) {
    return users.filter((user) => isValid(user));
}



//перевірка на валідність String
function validString(str) {
    if (!str || typeof (str) != 'string') {
        return false;
    }
    if (str.charAt(0) === str.charAt(0).toLowerCase()) {
        return false;
    }
    return true;
}
//перевірка на валідність age
function checkAge(age) {
    if (typeof (age) != 'number' || age < 0) {
        return false;
    }
    return true;
}
//перевірка на валідність phone

function validatePhone(phone, country) {

    const phoneFormats = {

        Germany: /^\d{4}[-\s]?\d{7}$/,

        Ireland: /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/,

        Australia: /^\d{2}[-\s]?\d{4}[-\s]?\d{4}$/,

        "United States": /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,

        Finland: /^0\d{1}[-\s]?\d{3}[-\s]?\d{3}$/,

        Turkey: /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,

        Switzerland: /^0\d{2}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,

        "New Zealand": /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,

        Spain: /^\d{3}[-\s]?\d{3}[-\s]?\d{3}$/,

        Norway: /^\d{8}$/,

        Denmark: /^\d{8}$/,

        Iran: /^\d{3}[-\s]?\d{8}$/,

        Canada: /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,

        Netherlands: /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,

        France: /^\d{2}[-\s]?\d{2}[-\s]?\d{2}[-\s]?\d{2}[-\s]?\d{2}$/,

    };

    return phoneFormats[country] ? phoneFormats[country].test(phone) : false;

}
//перевірка на валідність email
function checkEmail(email) {
    if (!email || typeof (email) != 'string' || !email.includes("@")) {
        return false;
    }
    return true;
}

function filterObjects(array, filters) {
    return array.filter((item) => {
        // Перевірка країни
        if (filters.country && item.country !== filters.country) {
            return false;
        }
        // Перевірка віку
        if (filters.age && item.age !== filters.age) {
            return false;
        }
        // Перевірка статі
        if (filters.gender && item.gender !== filters.gender) {
            return false;
        }
        // Перевірка favorite
        if (typeof filters.favorite !== 'undefined' && item.favorite !== filters.favorite) {
            return false;
        }
        // Якщо об'єкт відповідає всім умовам, повертаємо true
        return true;
    });
}
// комапаратор
function compareObjectsByField(param, order) {
    return function (a, b) {
        let comparison = 0;

        if (a[param] < b[param]) {
            comparison = -1;
        } else if (a[param] > b[param]) {
            comparison = 1;
        }

        return order === -1 ? comparison * -1 : comparison;
    };
}
//сортування масиву за param, в порядку order==1 зростанням, order==-1 спаданням
function sortObjects(array, param, order) {
    return array.slice().sort(compareObjectsByField(param, order));
}



// Функція для пошуку об'єкта за параметром
function findObjectByParam(arr, param, value) {
    return arr.filter((obj) => {
        if (typeof obj[param] === 'string' && typeof value === 'string') {
            // Якщо параметр та значення є строковими, виконуємо пошук за текстом
            return obj[param].toLowerCase().includes(value.toLowerCase());
        } else if (typeof obj[param] === 'number' && typeof value === 'number') {
            // Якщо параметр та значення є числовими, виконуємо пошук за числовим значенням
            return String(obj[param]).includes(String(value));
        } else if (typeof obj[param] === 'number' && typeof value === 'string') {

            let numbers = [...value.matchAll("[0-9]+")];
            numbers = numbers.map((value) => Number(value));
            if (value.includes("<")) {
                return obj[param] < numbers[0];
            } else if (value.includes(">")) {
                return obj[param] > numbers[0];
            } else if (value.includes("-")) {
                let max = Math.min(numbers[0], numbers[1]);
                let min = Math.max(numbers[0], numbers[1]);
                return (obj[param]) > max && (obj[param]) < min;
            }
        }

        return false;
    });
}
//вираховуємо % знайдених за віком юзерів до всієї к-сті
function calcPercentOfFound(arr, value) {
    {
        const numOfMatches = findObjectByParam(arr, "age", ">60").length;
        const totalNum = arr.length;
        console.log(numOfMatches);
        const percentage = (numOfMatches / totalNum) * 100;
        return percentage + " percents";
    }
}


// Основна функція для форматування та об'єднання об'єктів
function formatAndMergeUsers(randomUserMockThis, additionalUsersThis) {
    const formattedRandomUserMock = randomUserMockThis.map(formatUser);
    const mergedUsers = mergeObjects(formattedRandomUserMock, additionalUsersThis);
    return mergedUsers;
}

// Приклад використання функції
const randomUserMockThis = randomUserMock;
const additionalUsersThis = additionalUsers;
const result = formatAndMergeUsers(randomUserMockThis, additionalUsersThis);

console.log(result);

console.log(checkValid(result));

console.log(sortObjects(result, "full_name", 1));
console.log(sortObjects(result, "age", 1));
console.log(sortObjects(result, "country", 1));

console.log(findObjectByParam(result, "full_name", "re"));

console.log(findObjectByParam(result, "age", ">60"));
console.log(calcPercentOfFound(result, ">60"));