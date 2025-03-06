'use client';

import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [birthYear, setBirthYear] = useState<string>('');
  const [zodiac, setZodiac] = useState<string>('');
  const [showYearList, setShowYearList] = useState<boolean>(false);
  const yearListRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const years = Array.from({ length: 201 }, (_, i) => 1900 + i);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        yearListRef.current &&
        !yearListRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowYearList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const calculateZodiac = (year: number): string => {
    const zodiacAnimals = [
      'Rat',
      'Ox',
      'Tiger',
      'Rabbit',
      'Dragon',
      'Snake',
      'Horse',
      'Goat',
      'Monkey',
      'Rooster',
      'Dog',
      'Pig',
    ];
    if (year) {
      const zodiacIndex = (year - 4) % 12;
      return zodiacAnimals[zodiacIndex];
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateZodiac(parseInt(birthYear));
    setZodiac(result);
  };

  const handleYearSelect = (year: number) => {
    setBirthYear(year.toString());
    setShowYearList(false);
    setZodiac('');
  };

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Chinese Zodiac Calculator</h1>
      </header>

      <main className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label htmlFor="birthYear" className="block text-lg mb-2">
              Enter Your Birth Year:
            </label>
            <div className="relative">
              <input
                ref={inputRef}
                type="number"
                id="birthYear"
                value={birthYear}
                onChange={(e) => {
                  setBirthYear(e.target.value);
                  setZodiac('');
                }}
                onFocus={() => setShowYearList(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setShowYearList(false);
                  }
                }}
                placeholder="e.g., 1990"
                min="1900"
                max="2100"
                required
                className="w-full p-2 border rounded-lg bg-background text-foreground"
              />
              {showYearList && (
                <div
                  ref={yearListRef}
                  className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto bg-background border rounded-lg shadow-lg"
                >
                  {years.map((year) => (
                    <div
                      key={year}
                      className="p-2 hover:bg-black/[.05] dark:hover:bg-white/[.06] cursor-pointer"
                      onClick={() => handleYearSelect(year)}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-foreground text-background py-2 px-4 rounded-lg hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
          >
            Calculate
          </button>
        </form>

        {zodiac && (
          <section className="text-center mb-8 p-6 bg-black/[.05] dark:bg-white/[.06] rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Your Chinese Zodiac Sign</h2>
            <p className="text-xl">You were born in the Year of the {zodiac}</p>
          </section>
        )}

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">About Chinese Zodiac</h2>
          <p className="text-foreground/80">
            The Chinese zodiac is a traditional classification scheme based on the lunar
            calendar that assigns an animal and its reputed attributes to each year in a
            repeating twelve-year cycle.
          </p>
        </section>
      </main>

      <footer className="text-center mt-8 text-foreground/60">
        <p>© {new Date().getFullYear()} Chinese Zodiac Calculator. All rights reserved.</p>
      </footer>
    </div>
  );
}
