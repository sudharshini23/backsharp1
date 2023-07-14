// console.log('a');
// console.log('b');

async function print() {
    try {
        console.log('a')
        console.log('b')
        await new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(console.log('c'))
            },3000)
        })
        await new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve(console.log('d'))
            },0)
        })
        console.log('e')
    }
    catch(err) {
        console.log(err)
    }
}

// async function print() {
//     console.log('a');
//     console.log('b');
//     await new Promise((resolve, reject) => {
//         setTimeout(resolve ,3000)
//     })
//     console.log('d')
//     await new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('d')
//         },0)
//     })
//     console.log('e');
// }
  
print();






// console.log('a');
// console.log('b');

// const first = () => {
//     const promise1 = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('c')
//         }, 3000)
//     })
//     return promise1;
// }

// const second = () => {
//     const promise2 = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve('d')
//         }, 0)
//     })
//     return promise2;
// }

// async function promises() {
//     const promise1val = await promise1(text);
//     const promise2val = await promise2(text);
// }

// promises();

// const allPromises = Promise.all([Promise.resolve(first),Promise.resolve(second)])
// console.log(allPromises)

// first().then(text1 => {
//     console.log(text1)
//     second().then(text2 => {
//         console.log(text2)
//         console.log('e')
//     })
// })
