"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";

interface SearchProps {
  isSecondary?: boolean;
}

const Search = ({ isSecondary }: SearchProps) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!search) {
      return;
    }

    router.push(`/restaurants?search=${search}`);
  };

  return (
    <form onSubmit={handleSearchSubmmit} className="flex gap-2">
      <Input
        placeholder="Buscar restaurantes"
        className="border-none"
        onChange={handleChange}
      />
      <Button
        className={`${isSecondary && "bg-yellow-500"}`}
        type="submit"
        size="icon"
      >
        <SearchIcon size={20} />
      </Button>
    </form>
  );
};

export default Search;
