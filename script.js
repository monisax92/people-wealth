const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double-money');
const onlyMillionairesBtn = document.getElementById('only-millionaires');
const sortMoneyBtn = document.getElementById('sort-money');
const totalMoneyBtn = document.getElementById('total-money');
const usersTable = document.getElementById('users');

let usersData = [];

const formatMoney = money => {
	return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

const updateUsersTable = (providedData = usersData) => {
	usersTable.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
	providedData.forEach(person => {
		const el = document.createElement('div');
		el.classList.add('person');
		el.innerHTML = `<strong>${person.name}</strong> $ ${formatMoney(
			person.money
		)}`;
		usersTable.appendChild(el);
	});
};

const getRandomUser = async () => {
	const response = await fetch('https://randomuser.me/api');
	const data = await response.json();

	const user = data.results[0];

	const userWithMoney = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000)
	};

	usersData.push(userWithMoney);

	updateUsersTable();
};

updateUsersTable();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

addUserBtn.addEventListener('click', () => {
	getRandomUser();
});

doubleMoneyBtn.addEventListener('click', () => {
	usersData = usersData.map(person => {
		return { name: person.name, money: person.money * 2 };
	});
	updateUsersTable();
});

onlyMillionairesBtn.addEventListener('click', () => {
	usersData = usersData.filter(person => person.money >= 1000000);
	updateUsersTable();
});

sortMoneyBtn.addEventListener('click', () => {
	usersData = usersData.sort((a, b) => b.money - a.money);
	updateUsersTable();
});

totalMoneyBtn.addEventListener('click', () => {
	updateUsersTable(); //prevent multiple total boxes
	let total = usersData.reduce((acc, curr) => {
		return (acc += curr.money);
	}, 0);

	const totalDisplay = document.createElement('div');
	totalDisplay.innerHTML = `<h3>Total wealth is <strong>$ ${formatMoney(
		total
	)}</strong></h3>`;
	usersTable.appendChild(totalDisplay);
});
