import Contracts from "../contracts/Contracts";

class FilterPersons {
    public static filter = (persons: Contracts.Person[]): Contracts.Person[] => {
        const { searchParams } = new URL(window.location.href);

        if (searchParams.get("name")?.trim()?.length)
            return FilterPersons.byName(searchParams.get("name")?.trim() ?? "", persons);

        else if (searchParams.get("city")?.trim()?.length)
            return FilterPersons.byCity(searchParams.get("city")?.trim() ?? "", persons);

        return FilterPersons.default(persons);
    }

    private static byName = (name: string, persons: Contracts.Person[]): Contracts.Person[] => {
        return persons.filter((person) => person.name.toLowerCase().match(name.toLowerCase()))
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    private static byCity = (city: string, persons: Contracts.Person[]): Contracts.Person[] => {
        return persons.filter((person) => person.address.city.toLowerCase().match(city.toLowerCase()))
            .sort((a, b) => a.address.city.localeCompare(b.address.city));
    }

    private static default = (persons: Contracts.Person[]): Contracts.Person[] => {
        return persons.sort((a, b) => a.name.localeCompare(b.name))
            .filter((person, index) => index < 5 ? person : null);
    }
}

export default FilterPersons;