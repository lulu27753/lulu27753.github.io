/**
 * 快排
 * @author cnzsb
 * @date 2017-02-13 00:51:06
 */

function quickSort(arr) {
    if (arr.length <= 1) return arr

    var base = Math.floor(arr.length / 2) // 1. 设置基准值
    var baseValue = arr.splice(base, 1) // 2. 取出基础值
    var left = []
    var right = []

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < baseValue) left.push(arr[i]) // 3. 小于基准值的放在 left 中，否则放进 right
        else right.push(arr[i])
    }

    return quickSort(left).concat(baseValue, quickSort(right)) // 4. 递归 left 和 right 并最终拼接完整的数组
}

quickSort([7, 8, 3, 2, 1, 6, 5, 4]) // => 1 - 8
