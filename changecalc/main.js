document.getElementById('change-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const money = [
        { name: 'Hundreds', value: 10000 },
        { name: 'Fifties', value: 5000 },
        { name: 'Twenties', value: 2000 },
        { name: 'Tens', value: 1000 },
        { name: 'Fives', value: 500 },
        { name: 'Dollars', value: 100 },
        { name: 'Quarters', value: 25 },
        { name: 'Dimes', value: 10 },
        { name: 'Nickels', value: 5 },
        { name: 'Pennies', value: 1 }
    ];

    const amtDue = parseFloat(document.getElementById('amount-due').value);
    const amtRec = parseFloat(document.getElementById('amount-received').value);

    if (isNaN(amtDue) || amtDue === '' || isNaN(amtRec) || amtRec === '') {
        alert('Please enter a valid number');
        return;
    }
    if (amtRec < amtDue) {
        alert('Please enter an amount greater than or equal to the amount due');
        return;
    }

    let change = (amtRec - amtDue) * 100;
    let totalChangeDue = amtRec - amtDue;

    money.forEach(coin => {
        const coinAmount = Math.floor(change / coin.value);
        change %= coin.value;

        document.getElementById(`${coin.name}-output`).textContent = `${coin.name}: ${coinAmount}`;
    });

    document.getElementById('total-change-output').textContent = `$${totalChangeDue.toFixed(2)}`;
});
