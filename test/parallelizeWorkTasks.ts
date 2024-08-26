import should from 'should';
import {
    parallelizeWorkTasks,
} from '../src/parallelizeWorkTasks';

// utility to simulate some future work
function work(value) {

    if (value === 'err') {
        return Promise.reject(new Error('test error'));
    }

    return new Promise((r) => {
        setTimeout(() => r(value), Math.random() * 2000);
    });

}

describe('parallelizeWorkTasks', () => {

    it('should process 3 work items with 3 parallelExecutionMax', async () => {

        const tasks = [
            work('a'),
            work('b'),
            work('c'),
        ];
        let results: string[] | undefined;
        let error: Error | undefined;

        try {
            results = await parallelizeWorkTasks(tasks, 3);
        } catch(e) {
            error = e;
        }

        should(results).deepEqual(['a', 'b', 'c']);
        should(error).be.undefined;

    });

    it('Should reject with error', async () => {

        const tasks = [
            work('err'),
            work('b'),
            work('c'),
        ];
        let results: string[] | undefined;
        let error: Error | undefined;

        try {
            results = await parallelizeWorkTasks(tasks, 3);
        } catch(e) {
            error = e;
        }

        should(results).be.undefined;
        should(error?.message).equal('test error');

    });

    it('Should process empty array of promises', async () => {

        const tasks = [];
        let results: string[] | undefined;
        let error: Error | undefined;

        try {
            results = await parallelizeWorkTasks(tasks, 3);
        } catch(e) {
            error = e;
        }

        should(results).deepEqual([]);
        should(error).be.undefined;

    });

    it('Should not process too many tasks', async () => {

        const tasks = [
            work('a'),
            work('b'),
            work('c'),
            work('d'),
            work('e'),
            work('f'),
            work('g'),
            work('h'),
            work('i'),
            work('j'),
        ];
        let results: string[] | undefined;
        let error: Error | undefined;

        try {
            results = await parallelizeWorkTasks(tasks, 3);
        } catch(e) {
            error = e;
        }

        should(results).be.undefined;
        should(error?.message).equal('Exceeded parallelExecutionMax! Try running fewer parallel work tasks!');

    });

    it('Should enforce the default parallelExecutionMax', async () => {

        const tasks = [
            work('a'),
            work('b'),
            work('c'),
            work('d'),
            work('e'),
            work('f'),
            work('g'),
            work('h'),
            work('i'),
            work('j'),
        ];
        let results: string[] | undefined;
        let error: Error | undefined;

        try {
            results = await parallelizeWorkTasks(tasks);
        } catch(e) {
            error = e;
        }

        should(results).be.undefined;
        should(error?.message).equal('Exceeded parallelExecutionMax! Try running fewer parallel work tasks!');

    });

});
