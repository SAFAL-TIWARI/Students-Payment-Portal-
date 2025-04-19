#include <emscripten/bind.h>
#include <unordered_map>
#include <string>
#include <emscripten/emscripten.h>

// Student structure to hold details
struct Student
{
    std::string fullName;
    std::string branch;
    std::string category;
    std::string roomNumber;
    int numberOfDays;  // Number of days the student stayed
    std::string month; // Month for which payment is being made
};

// Database of students
std::unordered_map<std::string, Student> studentDatabase = {
    {"35130", {"Safal Tiwari", "IoT", "Gen", "R-5", 30, "April"}},
    {"34605", {"Sumit Rajpoot", "IoT", "Obc", "TV-Room", 25, "April"}},
    {"35193", {"Mayank Jaiswal", "IoT", "Obc", "29", 28, "April"}}};

// Function to fetch student details
std::string getStudentDetails(const std::string &scholarNumber)
{
    if (studentDatabase.find(scholarNumber) != studentDatabase.end())
    {
        const Student &student = studentDatabase[scholarNumber];
        return "Full Name: " + student.fullName + "\n" +
               "Branch: " + student.branch + "\n" +
               "Category: " + student.category + "\n" +
               "Room Number: " + student.roomNumber + "\n" +
               "Number of Days: " + std::to_string(student.numberOfDays) + "\n" +
               "Month: " + student.month;
    }
    return "Error: Scholar number not found!";
}

// Bind the C++ function to make it callable from JavaScript
EMSCRIPTEN_BINDINGS(student_data_module)
{
    emscripten::function("getStudentDetails", &getStudentDetails);
}