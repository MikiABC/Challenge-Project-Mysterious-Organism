// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

//factory function to create dna object
const pAequorFactory = (dna, specimenNum) =>{
  return {
        specimenNum,
        dna,
        //mutate dna strand by changing one random base
        mutate(){
          let randNum = Math.floor(Math.random() * this.dna.length); // find index position
          let randBase = returnRandBase(); //generate replacement base
          if(this.dna[randNum] !== randBase){
             this.dna.splice(randNum, 1, randBase); //if are NOT EQUAL replace at index with random base
             const mutated = this.dna; //new array
             return mutated;
               } else {
                   randBase = returnRandBase(); // if ARE EQUAL run again until they are not 
                   this.dna.splice(randNum, 1, randBase); 
                   const mutated = this.dna;
                   return mutated;
               }
           },
           //compare current strand to previous
           compareDNA(pAequor){
               let score = 0; //set counter
                for(let i= 0; i < 15; i++){
                if(this.dna[i] === pAequor.dna[i]){  
                score++; //add one for every base that is the same
                 }
              }
              const percent = Math.floor(score / 15 * 100);
               return `Specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percent} percent of thier DNA in common.`;
           },
           //compute chance of survival (survive if over 60%)
           willLikelySurvive(){
             let count = 0; //start counter
             this.dna.forEach(base => {if(base === 'G' || base === 'C') {
               count++; //add 1 to count if looping C or G
               }
               }
               );
               if (count > 8){
                 return true; //count is over 60%
               }else{
                 return false; //count is less than 60%
               }
     
               },
               // change each base to the opposing base ('A' = 'T' / 'T' = 'A' etc.)
               complementStrand(){
                 console.log(dna);
               let result = []; //an array to store the new strand
               let k = 0; // set counter
               // a loop to switch each base to the opposing base
               for(let k = 0; k < dna.length; k++){
                 if (dna[k] === 'A'){
                   dna[k] = 'T';
                 } else if (dna[k] === 'T'){
                   dna[k] = 'A';
                 }else if (dna[k] === 'G'){
                   dna[k] = 'C';
                   } else {
                     dna[k] = 'G';
                   }
                 result.push(dna[k]); //push result to array
               }
               return result;
               }
     }
}


//const testStrand = pAequorFactory(mockUpStrand(), 1); //pass for comparison
//console.log(pAequorFactory(mockUpStrand(), 2).mutate()); //test mutate - passed
//console.log(pAequorFactory(mockUpStrand(), 3).compareDNA(testStrand)); //test compare - passed
//console.log(pAequorFactory(mockUpStrand(), 4).willLikelySurvive()); //test willLikelySurvive - passed
//console.log(pAequorFactory(mockUpStrand(), 5).complementStrand(testStrand))  // test complimentStrand - passed

//create 30 instances that will survive

const findSurvivors = () =>{
  const survivors = []; //empty array to hold pAequor sample
  let i = 0; //start count for loop
  let count = 0; // start count for specimen numbers
  //loop
  do{
   i++;
   count++;
     let pool = pAequorFactory(mockUpStrand(), [count]);
   if (pool.willLikelySurvive()){
       survivors.push(pool); //YES will survive so move to empty array
   }else {
       i--; //NO did not survive so move the counter back one
   }
}while(i < 30);
return survivors;
}

const pAequorSample = findSurvivors(); // A sample array of 30 instances that survived

console.log(pAequorSample); // print sample
