import {getInputLines} from "../common/inputUtils";
import {getAdapters} from "./index";

interface Adapter {
    value: number,
    connected: Adapter[]
}

class AdapterChain {
    private chain: number[] = []
    private allAdapters: Map<number, Adapter> = new Map<number, Adapter>();

    public addLink(adatper): void {
        this.chain.push(adatper)
    }

    public getEnd(): number {
        return this.chain[this.chain.length - 1]
    }

    private getOrCreateAdapter(adapterValue): Adapter {
        if (this.allAdapters.has(adapterValue)) {
            return this.allAdapters.get(adapterValue)
        }

        const adapter = {
            value: adapterValue,
            connected: []
        }
        this.allAdapters.set(adapterValue, adapter);
        return adapter
    }

    private constructAdapterGraph() {
        let adapter: Adapter;
        for (let i = 0; i < this.chain.length; i++) {
            adapter = this.getOrCreateAdapter(this.chain[i]);
            for (let j = i + 1; j < this.chain.length; j++) {
                if (this.chain[j] - this.chain[i] <= 3) {
                    adapter.connected.push(this.getOrCreateAdapter(this.chain[j]))
                }
            }
        }
    }

    private countPath(start: Adapter, end: Adapter): number {
        if (start.value === end.value) {
            return 1;
        }

        return start.connected.reduce((total, adapter) => total + this.countPath(adapter, end), 0);
    }

    public calculatePermutations(): number {
        if(this.chain.length < 3) {
            return 1
        }

        this.constructAdapterGraph();
        const root = this.allAdapters.get(this.chain[0])
        const end = this.allAdapters.get(this.chain[this.chain.length - 1]);
        return this.countPath(root, end);
    }
}

const MAX_RANGE = 3;

function splitIntoAdapterChains(adapters: number[]): AdapterChain[] {
    const chains: AdapterChain[] = [];
    let currentChain: AdapterChain = new AdapterChain();
    currentChain.addLink(adapters[0]);

    for (let adapter of adapters.slice(1)) {
        if (adapter - currentChain.getEnd() === MAX_RANGE) {
            currentChain.addLink(adapter)
            chains.push(currentChain);
            currentChain = new AdapterChain();
        }
        currentChain.addLink(adapter);
    }

    return chains;
}

export default function part2(): number {
    const adapters = getAdapters();

    return splitIntoAdapterChains(adapters)
        .map(chain => chain.calculatePermutations())
        .reduce((total, chainPermutations) => total * chainPermutations, 1);
}