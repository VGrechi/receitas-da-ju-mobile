// import { Share } from 'react-native';
// // import { AsyncStorage } from 'react-native';
// import RNFetchBlob from 'react-native-fetch-blob';

// import { Recipe } from '../models/models';

// export async function saveBackUp(): Promise<void> {
//     // Query ASYNC STORAGE
//     const response = await AsyncStorage.getItem('recipes');
//     let recipes: Recipe[] = [];

//     if(response){
//         recipes = JSON.parse(response);

//         // GENERATE .csv file
//         const rows: String[][] = [];
//         recipes.map(r => {
//             r.ingredients.map(i => {
//                 let row: String[] = [];
//                 row.push(r.id.toString());
//                 row.push(r.name);
//                 row.push(r.difficulty);
//                 row.push(r.preparationTime);
//                 row.push(r.preparation);
//                 row.push(i.single.id.toString());
//                 row.push(i.single.name);
//                 row.push(i.percentage.toString());
//                 row.push(i.value.toString());
//                 rows.push(row);
//             })
//         })

//         let data: string = '';
//         data = 'recipeId;recipeName;difficulty;preparationTime;preparation;ingredientId;ingredientName;ingredientPercentage;ingredientValue\n';
//         data += rows.map(r => r.join(';')).join('\n');
//         console.log(data);

//         // SAVE File
//         /* const path = DocumentDirectoryPath + '/receitas-da-ju-backup.csv';
//         return writeFile(path, data, 'utf8'); */
//         /* const encoded = base64.encode(data);
//         Share.share({
//             message: "Teste",
//             url: `data:text/csv;base64,${encoded}`,
//         }); */
//         /* const path = `${RNFetchBlob.fs.dirs.DownloadDir}/receitas-da-ju-bkp.csv`;
//         return RNFetchBlob.fs.writeFile(path, data, 'utf8') */
//         return Promise.resolve();
//     } else {
//         return Promise.resolve();
//     }
// }
