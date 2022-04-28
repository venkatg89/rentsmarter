

function factory() {
    return (a:number,b:number) => a + b
}

const sum1 = factory()
const sum2 = factory()

sum1(1,2);
sum2(1,2);

sum1 === sum2; // => false
sum1 === sum1; // ==> true

