// Nothing will work here, because "lingo" is a fake library, it doesn't exist on runtime

import { Structure, StructureConvertible, StructureConverter, InputAnalyzer, Language, OutputGenerator } from "lingo"

/** @private */
const langs = {
  ua: Language.Ukrainian,
  en: Language.English,
} as const

/** @private */
type Lang = keyof typeof langs

/** @private */
interface StructureFunctional extends Structure, StructureConvertible {}

/** @private */
class InputAnalyzerFunctional extends InputAnalyzer<StructureFunctional> {}

/** @private */
class StructureFunctionalConverter extends StructureConverter<StructureFunctional> {}

/** @private */
class OutputGeneratorFromStructureFunctional extends OutputGenerator<StructureFunctional> {}

export class Translator {
  private readonly analyzer = new InputAnalyzerFunctional()
  private readonly converter = new StructureFunctionalConverter()
  private readonly generator = new OutputGeneratorFromStructureFunctional()

  private getLanguage(lang: Lang): Language {
    return langs[lang]
  }

  translate(input: string, inputLang: Lang, outputLang: Lang): string {
    const inputLanguage = this.getLanguage(inputLang)
    const inputFunctionalAnalysis = this.analyzer.analyze(input, inputLanguage)
    const outputLanguage = this.getLanguage(outputLang)
    const outputFunctionalAnalysis = this.converter.convert(inputFunctionalAnalysis, inputLanguage, outputLanguage)
    const output = this.generator.generate(outputFunctionalAnalysis, outputLanguage)

    return output
  }
}

const translator = new Translator()
const output = translator.translate('Несе Галя воду, коромисло гнеться', 'ua', 'en')

console.log(output)
