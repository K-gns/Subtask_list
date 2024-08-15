// src/stores/SidebarStore.ts
import { makeAutoObservable } from 'mobx';

class SidebarStore {
    toggle = false;

    constructor() {
        makeAutoObservable(this);
    }

    toggleSidebar() {
        this.toggle = !this.toggle;
    }
}

export const sidebarStore = new SidebarStore();
