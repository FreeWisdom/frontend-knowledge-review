# 1、算法基本概念
* 复杂度由好到坏：
    * 常数型 O（1）
    * 对数型 O（log n）
    * 线性型 O（n）
    * 线性对数型 O（n log n）
    * 多项式型 O（n^k）
    * 指数型 O（k^n）:计算机跑不动 
    * 阶乘型 O（n!）
## 1.1、时间复杂度-计算方法
> 时间复杂度只关注最⾼数量级，且与之系数也没有关系。
> 时间复杂度分析的基本策略是：从内向外分析，从最深层开始分析;如果遇到函数调⽤，就要深⼊函
数进⾏分析。
1. 算法执⾏所需要的临时空间，不随着变量⼤⼩⽽变化，空间复杂度为⼀个常量，可以表⽰为O(1)
```js
function sum() {
    const a = 1;
    const b = 2;
    return a + b;
}
```
2. 代码执⾏次数为 x，n 为⽬标数，符合 2^x = n，所以 x = log2(logn)，即时间复杂度为 O(logn)
```js
function fun(n) {
    let i = 1;
    while (i < n) {
        i = i * 2;
    }
}
```
3. ⼀个循环，时间复杂度通常为 O(n)
```js
function fun(n) {
    let sum = 0;
    for (let i = 0; i < n.length; i++) {
        sum += n[i];
    }
    return sum;
}
```
4. 在 O(logn) 的基础上，再执⾏⼀个 n 次循环，即是 O(nlogn)
```js
function fun(n) {
    for (let j = 0; j < n; j++) {
        let i = 1;
        while (i < n) {
            i = i * 2;
        }
    }
}
```
5. 循环嵌套，⽐如我们常⻅的冒泡排序算法，时间复杂度就是 O(n^2)
```js
function sort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}
```
6. 斐波那契，使⽤递归的情况下，因为使⽤了两次递归，时间复杂度为 O(2^n)
```js
function fib(n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}
```
7. 下例，时间复杂度为 O(n!) ，基本不能称作为算法，n 越⼤，就容易卡死，⼩⼼尝试
```js
function fun(n) {
    console.log(n);
    for (let i = 0; i < n; i++) {
        fun(n - 1);
    }
}
```
## 1.2、空间复杂度-计算方法
> 算法的空间复杂度指的是在运⾏过程中临时占⽤的存储空间⼤⼩的量度

> * 代码所占⽤的空间：与算法本⾝的书写⻓短有关
> * 输⼊数据所占⽤的空间：调⽤函数时传递⽽来，与算法本⾝⽆关
> * 辅助变量所占⽤的空间

> ⼀个算法的空间复杂度只考虑在运⾏过程中为局部变量所分配的存储空间的⼤⼩，它包括为参数表中形参变量分配的存储空间、在函数体中定义的局部变量分配的存储空间两个部分

1. 所需要的临时空间不随着某个变量 n 的⼤⼩⽽变化，即此算法空间复杂度为⼀个常量，可表⽰为 O(1)
```js
function sum() {
    const a = 1;
    const b = 2;
    return a + b;
}
```
2. 下例， 定义⼀个数组 的 空间 ，数组的⻓度随着 n 的规模不同，会不⼀样，这⾥空间复杂度为 O(n)
```js
function fun(n) {
    let arr = [];
    for (let i = 0; i < n.length; i++) {
        arr.push(n[i]);
    }
    return arr;
}
```
3. 下例，最终形成⼀个 ⼆维数组 的 空间 ，空间复杂度为 O(n^2)
```js
function fun(n) {
    const arr = [];
    for (let i = 0; i < n; i += 1) {
        arr.push([]);
        for (let j = 0; j < n; j += 1) {
            arr[i].push(j);
        }
    }
}
```