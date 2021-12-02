const task = require('./task-3');

test('Get users with Ids=3, 7, 9', async () => {
    const expectedResult = [
        {
            userId: '2K0aNct9sNbJGn2nNOLa',
            userFullName: 'John Spenser',
            regCode: 'DZ_445GN-ZM_1100',
            totalPrices: [
                {
                    amount: 1254,
                    currency: 'USD'
                }
            ]
        },
        {
            userId: 'P7y57nf9VHNekZnMQgg0',
            userFullName: 'Helen Stant',
            regCode: 'DZ_988NB-SL_1003',
            totalPrices: [
                {
                    amount: 1993,
                    currency: 'USD'
                }
            ]
        }
    ];

    expect(await task()).toEqual(expectedResult);
});
