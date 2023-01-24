// made up library for linguistic analysis
declare module "lingo" {
  const enum Language {
    Ukrainian = "Ukrainian",
    English = "English",
  }

  interface Structure {}
  interface StructureConvertible {}

  abstract class InputAnalyzer<Struct extends Structure> {
    analyze(input: string, inputLanguage: Language): Struct
  }

  abstract class StructureConverter<Struct extends StructureConvertible> {
    convert(structure: Struct, inputLanguage: Language, outputLanguage: Language): Struct
  }

  abstract class OutputGenerator<Struct extends Structure> {
    generate(structure: Struct, outputLanguage: Language): string
  }
}
