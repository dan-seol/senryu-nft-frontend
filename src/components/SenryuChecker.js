import { syllable } from 'syllable'

const syllableRequirements = [5, 7, 5]

let checkLines = (lines, n) => {

    //console.log(`Checking whether the poem: ${lines} has ${n} lines`)

    return lines.length === n

}

let checkLineForSyllableCount = (line, n) => {

    //console.debug(`Checking whether the line: "${line.trim()}" has ${n} syllables`)
    let words = line.trim().split(/(\s+)/)
    //console.debug(`it has ${words.map(syllable).reduce((prev, curr) => prev + curr)} syllables`,)

    return words.map((word) => {
        //console.debug(`${word} has ${syllable(word)} syllables`)
        return syllable(word)
    }).reduce((prev, curr) => prev + curr) === n
}

export function isFormattable(poem) {
    let lines = ('' + poem).split(/[\r\n]+/)
    return checkLines(lines, 3)

}

export function formatSenryu(poem) {
    let lines = ('' + poem).split(/[\r\n]+/)

    return {
        firstLine: lines[0].trim(),
        secondLine: lines[1].trim(),
        thirdLine: lines[2].trim(),
    }
}

export function checkFormattedSenryu(senryu) {
    let result = checkLineForSyllableCount(senryu.firstLine, syllableRequirements[0])
        && checkLineForSyllableCount(senryu.secondLine, syllableRequirements[1])
        && checkLineForSyllableCount(senryu.thirdLine, syllableRequirements[2])

    console.debug(`check result: ${result}`)
    return result
}

export function checkSenryu(poem) {

    let lines = ('' + poem).split(/[\r\n]+/)

    if (checkLines(lines, 3) && [0, 1, 2].every((i) => checkLineForSyllableCount(lines[i], syllableRequirements[i]))) {
        return formatSenryu(poem)
    } else {
        return undefined
    }

}