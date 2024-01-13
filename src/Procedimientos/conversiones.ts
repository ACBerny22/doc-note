import {} from "react";
 
export function formatDateToFullDate(dateString: string): string {
    // Create a new Date object from the input date string
    const date = new Date(dateString);
  
    // Get the individual components of the date
    const year: number = date.getFullYear();
    const month: string = date.toLocaleString('default', { month: 'long' });
    const day: number = date.getDate();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();
  
    // Assemble the full date format
    const fullDate: string = `${day} / ${month} / ${year}`;
  
    return fullDate;
  }
  
  // Usage example:
  const dateStr: string = "2023-04-26T12:34:56";
  const fullDateStr: string = formatDateToFullDate(dateStr);
  console.log(fullDateStr);


export function calculateAge(birthdate: string): number {
  const birthdateObj = new Date(birthdate);
  const now = new Date();

  // Calculate the difference in milliseconds
  const ageInMillis = now.getTime() - birthdateObj.getTime();

  // Convert the age from milliseconds to years
  const ageInYears = Math.floor(ageInMillis / (365.25 * 24 * 60 * 60 * 1000));

  return ageInYears;
}