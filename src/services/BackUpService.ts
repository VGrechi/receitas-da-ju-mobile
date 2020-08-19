import RNFS from 'react-native-fs';

interface RecipeExport {

}

export function saveBackUp(): Promise<void> {
    // Query ASYNC STORAGE
    // GENERATE .csv file
    const data: string = '';
    const aux: RecipeExport[] = [];

    // SAVE File
    const path = RNFS.DocumentDirectoryPath + '/receitas-da-ju-backup.csv';
    return RNFS.writeFile(path, data, 'utf8');
}