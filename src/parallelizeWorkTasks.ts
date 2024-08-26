/**
 *
 * @param {Promise[]} promises
 * @param {Number} parallelExecutionMax
 * @desc Given `Promises[]`
 *
 */
export function parallelizeWorkTasks(promises, parallelExecutionMax = 3) {

    if (promises.length > parallelExecutionMax) {
        throw new Error('Exceeded parallelExecutionMax! Try running fewer parallel work tasks!');
    }

    return Promise.all(promises);

}
