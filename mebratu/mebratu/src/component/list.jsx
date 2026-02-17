import React from 'react';

const List = () => {
    const fruits = ['apple', 'banana', 'mango'];
    return (
        <div>
            <h1 className='haniye'>list</h1>
            <ul>
                {fruits.map((fruit,index) => <li key={index}>{fruit}</li>)}
            </ul>
         </div>
    );
};

export default List;