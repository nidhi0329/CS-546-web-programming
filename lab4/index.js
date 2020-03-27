const animal = require("./data/animals");

async function main() {

    // create an animal named Sasha
    try {
         var animal_1 = await animal.create("Sasha", "Dog");
         console.log(animal_1);

    // create an animal named Lucy
    
        var animal_2 = await animal.create("Lucy", "Dog");
        console.log(animal_2);
    
    // getall

         var all_My_Animals = await animal.getAll();
         console.log(all_My_Animals); 

    //create an animal named Duke
   
         var animal_3 = await animal.create("Duke", "Walrus");
         console.log(animal_3); 
    
    // rename Sasha(animal_1) to Sashita
    
         var rename_Sasha = await animal.rename(animal_1._id, "Sashita");
         // var rename_Sasha = await animal.rename();

         console.log(rename_Sasha);

    // remove animal_2(Lucy) 
         var remove_animal = await animal.remove(animal_2._id);
         var all_My_Animals = await animal.getAll();

         console.log(all_My_Animals);
    }
    catch (e) {
         console.log(e);
    }    

}

main();