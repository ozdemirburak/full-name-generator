'use strict';

const names = {
    'us': {
        0: [
            'Liam', 'Noah', 'Oliver', 'James', 'Elijah', 'William', 'Henry', 'Lucas', 'Benjamin', 'Theodore',
            'Mateo', 'Levi', 'Sebastian', 'Daniel', 'Jack', 'Michael', 'Alexander', 'Owen', 'Asher', 'Samuel',
            'Ethan', 'Leo', 'Jackson', 'Mason', 'Ezra', 'John', 'Hudson', 'Luca', 'Aiden', 'Joseph',
            'David', 'Jacob', 'Logan', 'Luke', 'Julian', 'Gabriel', 'Grayson', 'Wyatt', 'Matthew', 'Maverick',
            'Dylan', 'Isaac', 'Elias', 'Anthony', 'Thomas', 'Jayden', 'Carter', 'Santiago', 'Ezekiel', 'Charles',
            'Josiah', 'Caleb', 'Cooper', 'Lincoln', 'Miles', 'Christopher', 'Nathan', 'Isaiah', 'Kai', 'Joshua',
            'Andrew', 'Angel', 'Adrian', 'Cameron', 'Nolan', 'Waylon', 'Jaxon', 'Roman', 'Eli', 'Wesley',
            'Aaron', 'Ian', 'Christian', 'Ryan', 'Leonardo', 'Brooks', 'Axel', 'Walker', 'Jonathan', 'Easton',
            'Everett', 'Weston', 'Bennett', 'Robert', 'Jameson', 'Landon', 'Silas', 'Jose', 'Beau', 'Micah',
            'Colton', 'Jordan', 'Jeremiah', 'Parker', 'Greyson', 'Rowan', 'Adam', 'Nicholas', 'Theo', 'Hunter'
        ],
        1: [
            'Olivia', 'Emma', 'Charlotte', 'Amelia', 'Sophia', 'Isabella', 'Ava', 'Mia', 'Evelyn', 'Luna',
            'Harper', 'Camila', 'Sofia', 'Scarlett', 'Elizabeth', 'Eleanor', 'Emily', 'Chloe', 'Mila', 'Violet',
            'Penelope', 'Gianna', 'Aria', 'Abigail', 'Ella', 'Avery', 'Hazel', 'Nora', 'Layla', 'Lily',
            'Aurora', 'Nova', 'Ellie', 'Madison', 'Grace', 'Isla', 'Willow', 'Zoe', 'Riley', 'Stella',
            'Eliana', 'Ivy', 'Victoria', 'Emilia', 'Zoey', 'Naomi', 'Hannah', 'Lucy', 'Elena', 'Lillian',
            'Maya', 'Leah', 'Paisley', 'Addison', 'Natalie', 'Valentina', 'Everly', 'Delilah', 'Leilani', 'Madelyn',
            'Kinsley', 'Ruby', 'Sophie', 'Alice', 'Genesis', 'Claire', 'Audrey', 'Sadie', 'Aaliyah', 'Josephine',
            'Autumn', 'Brooklyn', 'Quinn', 'Kennedy', 'Cora', 'Savannah', 'Caroline', 'Athena', 'Natalia', 'Hailey',
            'Aubrey', 'Emery', 'Anna', 'Iris', 'Bella', 'Eloise', 'Skylar', 'Jade', 'Gabriella', 'Ariana',
            'Maria', 'Adeline', 'Lydia', 'Sarah', 'Nevaeh', 'Serenity', 'Liliana', 'Ayla', 'Everleigh', 'Raelynn',
        ],
        2: [
            'Noah', 'Ezra', 'Logan', 'Dylan', 'Carter', 'Kai', 'Angel', 'Cameron', 'Ryan', 'Jordan',
            'Parker', 'Rowan', 'Hunter', 'River', 'August', 'Sawyer', 'Elliot', 'Hayden', 'Elliott', 'Amari',
            'Charlie', 'Karter', 'Avery', 'Riley', 'Blake', 'Remington', 'Lennox', 'Dallas', 'Phoenix', 'Emerson',
            'Rory', 'Finley', 'Ellis', 'Tatum', 'Milan', 'Ari', 'Casey', 'Dakota', 'Remy', 'Kamari',
            'Royal', 'Rylan', 'Baylor', 'Sage', 'Oakley', 'Armani', 'Eden', 'Quinn', 'Alexis', 'Denver',
        ]
    },
    'tr': {
        0: [
            'Mehmet', 'Mustafa', 'Ahmet', 'Ali', 'Hüseyin', 'Hasan', 'İbrahim', 'İsmail', 'Yusuf', 'Osman',
            'Murat', 'Ömer', 'Ramazan', 'Halil', 'Süleyman', 'Abdullah', 'Mahmut', 'Salih', 'Recep', 'Fatih',
            'Kadir', 'Emre', 'Mehmet Ali', 'Hakan', 'Adem', 'Kemal', 'Yaşar', 'Bekir', 'Musa', 'Metin',
            'Bayram', 'Serkan', 'Orhan', 'Burak', 'Furkan', 'Yasin', 'Gökhan', 'Uğur', 'Muhammed', 'Yakup',
            'Muhammet', 'Şükrü', 'Enes', 'Yunus', 'Cemal', 'Arif', 'Onur', 'Yılmaz', 'Şaban', 'Halil i̇brahim',
        ],
        1: [
            'Fatma', 'Ayşe', 'Emi̇ne', 'Hati̇ce', 'Zeynep', 'Eli̇f', 'Meryem', 'Şeri̇fe', 'Zehra', 'Sultan',
            'Hani̇fe', 'Merve', 'Havva', 'Zeli̇ha', 'Esra', 'Fadi̇me', 'Özlem', 'Hacer', 'Melek', 'Yasemi̇n',
            'Rabi̇a', 'Hülya', 'Cemi̇le', 'Sevi̇m', 'Gülsüm', 'Leyla', 'Di̇lek', 'Büşra', 'Aysel', 'Songül',
            'Kübra', 'Hali̇me', 'Esma', 'Aynur', 'Hayri̇ye', 'Kadri̇ye', 'Tuğba', 'Sevgi̇', 'Ruki̇ye', 'Hava',
            'Si̇bel', 'Derya', 'Fi̇li̇z', 'Asi̇ye', 'Kezi̇ban', 'Ebru', 'Ayşegül', 'Döndü', 'Selma', 'Ayten',
        ],
        2: [
            'Yaşar', 'Ayhan', 'Dursun', 'İsmet', 'Muzaffer', 'Ümit', 'Özgür', 'İlhan', 'Hikmet', 'Yüksel',
            'Özcan', 'Fikret', 'Cihan', 'Şerif', 'Deniz', 'Servet', 'Yücel', 'Sefa', 'Hidayet', 'Sezer',
            'Olcay', 'Saffet', 'Güngör', 'Durdu', 'Günay', 'Ömür', 'İlkay', 'Kamuran', 'Kudret', 'Satı'
        ]
    }
};

const surnames = {
    'us': [
        'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
        'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
        'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
        'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
        'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts',
        'Gomez', 'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker', 'Cruz', 'Edwards', 'Collins', 'Reyes',
        'Stewart', 'Morris', 'Morales', 'Murphy', 'Cook', 'Rogers', 'Gutierrez', 'Ortiz', 'Morgan', 'Cooper',
        'Peterson', 'Bailey', 'Reed', 'Kelly', 'Howard', 'Ramos', 'Kim', 'Cox', 'Ward', 'Richardson',
        'Watson', 'Brooks', 'Chavez', 'Wood', 'James', 'Bennett', 'Gray', 'Mendoza', 'Ruiz', 'Hughes',
        'Price', 'Alvarez', 'Castillo', 'Sanders', 'Patel', 'Myers', 'Long', 'Ross', 'Foster', 'Jimenez'
    ],
    'tr': [
        'Yılmaz', 'Kaya', 'Demi̇r', 'Çeli̇k', 'Şahi̇n', 'Yıldız', 'Yıldırım', 'Öztürk', 'Aydın', 'Özdemir',
        'Arslan', 'Doğan', 'Kılıç', 'Aslan', 'Çetin', 'Kara', 'Koç', 'Kurt', 'Özkan', 'Şi̇mşek',
        'Polat', 'Özcan', 'Korkmaz', 'Çakır', 'Erdoğan', 'Yavuz', 'Can', 'Acar', 'Şen', 'Aktaş',
        'Güler', 'Yalçın', 'Güneş', 'Bozkurt', 'Bulut', 'Keski̇n', 'Ünal', 'Turan', 'Gül', 'Özer',
        'Işık', 'Kaplan', 'Avcı', 'Sarı', 'Teki̇n', 'Taş', 'Köse', 'Yüksel', 'Ateş', 'Aksoy',
    ]
};

const getRandomItem = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};
const formatIsoCode = (isoCode) => {
    return isoCode.toLowerCase();
};
const getRandomName = (isoCode, gender) => {
    isoCode = formatIsoCode(isoCode);
    if (!names[isoCode] || !names[isoCode][gender]) {
        throw new Error(`No data available for the ISO code: ${isoCode} and gender: ${gender}`);
    }
    return getRandomItem(names[isoCode][gender]);
};
const getRandomSurname = (isoCode) => {
    isoCode = formatIsoCode(isoCode);
    if (!surnames[isoCode]) {
        throw new Error(`No data available for the ISO code: ${isoCode}`);
    }
    return getRandomItem(surnames[isoCode]);
};
const firstName = (isoCode, gender, n = 1) => {
    const namesArray = [];
    for (let i = 0; i < n; i++) {
        namesArray.push(getRandomName(isoCode, gender));
    }
    return namesArray.join(' ');
};
const lastName = (isoCode, n = 1) => {
    const surnamesArray = [];
    for (let i = 0; i < n; i++) {
        surnamesArray.push(getRandomSurname(isoCode));
    }
    return surnamesArray.join(' ');
};
const fullName = (isoCode, gender, firstN = 1, lastN = 1, space = ' ') => {
    return `${firstName(isoCode, gender, firstN)}${space}${lastName(isoCode, lastN)}`;
};

exports.firstName = firstName;
exports.fullName = fullName;
exports.lastName = lastName;
