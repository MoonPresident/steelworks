mod utils;

use wasm_bindgen::prelude::*;
use latin_squares::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, latin-generator!");
}

pub trait Command {
    fn execute(&self, data: &mut Vec<Vec<UDisplayRep>>);
    fn undo(&self, data: &mut Vec<Vec<UDisplayRep>>);
}

pub struct PlaceCommand {
    i: usize,
    j: usize,
    before: UDisplayRep,
    after: UDisplayRep
}

impl Command for PlaceCommand {
    fn execute(&self, data: &mut Vec<Vec<UDisplayRep>>) {
        data[self.i][self.j] = self.after;
    }

    fn undo(&self, data: &mut Vec<Vec<UDisplayRep>>) {
        data[self.i][self.j] = self.before;
    }
}

#[wasm_bindgen]
pub struct DisplayMatrix {
    n: usize,
    data: Vec<Vec<UDisplayRep>>,
    commandQueue: Vec<Box<dyn Command>>,
    commandIndex: usize
}

#[wasm_bindgen]
impl DisplayMatrix {
    #[wasm_bindgen(getter)]
    pub fn data(&self) -> Vec<UDisplayRep> {
        return self.data.clone().into_iter().flatten().collect();
    }

    #[wasm_bindgen(setter)]
    pub fn set_data(&mut self, new_Data: Vec<UDisplayRep>) {
        for i in 0..self.n {
            let offset = i * self.n;
            for j in 0..self.n {
                self.data[i][j] = new_Data[offset + j];
            }
        }
    }

    #[wasm_bindgen]
    pub fn place(&mut self, i: usize, j: usize, val: UDisplayRep) {
        //prepare this for the command principle
        let placement = Box::new(PlaceCommand {
            i,
            j,
            before: self.data[i][j],
            after: val
        });
        placement.execute(&mut self.data);
        self.add_command(placement);
    }

    pub fn solve(&mut self) {
        //This will be a command. Once this command is written, I expect this whole project will need a mild update.
    }
    
    fn add_command(&mut self, command: Box<dyn Command>) {
        //chop the head off the queue if necessary.
        self.commandQueue.truncate(self.commandIndex);
        self.commandQueue.push(command);
        self.commandIndex += 1;
    }

    #[wasm_bindgen]
    pub fn undo(&mut self) {
        if self.commandIndex == 0 {
            //Shouldn't get here, shouldn't be possible.
            return;
        }
        self.commandIndex -= 1;
        let command = &self.commandQueue[self.commandIndex];
        command.undo(&mut self.data);
    }

    #[wasm_bindgen]
    pub fn redo(&mut self) {
        if self.commandIndex == self.commandQueue.len() {
            return;
        }
        let command = &self.commandQueue[self.commandIndex];
        command.execute(&mut self.data);
        self.commandIndex += 1;
    }

    #[wasm_bindgen(getter)]
    pub fn n(&self) -> usize {
        return self.n;
    }

    #[wasm_bindgen(setter)]
    pub fn set_n(&self, _: usize) {
        //pass
    }

    //Add solve function?
}

#[wasm_bindgen]
pub fn sudoku() -> DisplayMatrix {
    return DisplayMatrix {
        n: 9,
        data: generate_sudoku(9),
        commandQueue: Vec::new(),
        commandIndex: 0
    };
}
