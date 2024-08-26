import should from 'should';
import {
    parallelizeWorkTasks,
} from '../src/parallelizeWorkTasks';

// utility to simulate some future work
function work(value) {
    return () => {
        if (value === 'err') {
            return Promise.reject(new Error('test error'));
        }

        return new Promise((r) => {
            setTimeout(() => r(value), Math.random() * 2000);
        });
    };
}

describe('parallelizeWorkTasks', () => {

    it('should process 3 work items with 3 parallelExecutionMax', async () => {

        const tasks = [
            work('a'),
            work('b'),
            work('c'),
        ];

        const results = await parallelizeWorkTasks(tasks, 3);

        should(results).deepEqual(['a', 'b', 'c']);

    });

    it('Should reject with error', () => {

        const tasks = [
            work('err'),
            work('b'),
            work('c'),
        ];

        return (<any>parallelizeWorkTasks(tasks, 3)).should.be.rejectedWith("test error")

    });

    it('Should process empty array of promises', async () => {

        const tasks = [];

        const results = await parallelizeWorkTasks(tasks, 3);

        should(results).deepEqual([]);

    });

    it('Should process many tasks', async () => {

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

        const results = await parallelizeWorkTasks(tasks, 3);

        should(results).deepEqual([
            'a', 'b', 'c', 'd', 'e',
            'f', 'g', 'h', 'i', 'j',
        ]);

    });

    it('Should work with one task at a time', async () => {

        const tasks = [
            work('a'),
            work('b'),
            work('c'),
        ];

        const results = await parallelizeWorkTasks(tasks, 1);

        should(results).deepEqual(['a', 'b', 'c']);

    });

});
