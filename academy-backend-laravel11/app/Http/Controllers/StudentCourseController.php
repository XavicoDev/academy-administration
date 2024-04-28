<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentCourseController extends Controller
{
    public function getCoursesForStudent(Request $request, $studentId)
    {
        $student = Student::find($studentId);

        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $courses = $student->courses()->get();

        return response()->json(['courses' => $courses], 200);
    }
    public function enrollStudentInCourse(Request $request, $studentId, $courseId)
    {
        $student = Student::find($studentId);
        $course = Course::find($courseId);

        if ($student && $course) {
            if ($student->courses()->where('course_id', $course->id)->exists()) {
                return response()->json(['message' => 'Estudiante ya matriculado en el curso.'], 400);
            }
            $student->courses()->attach($course);
            return response()->json(['message' => 'Estudiante matriculado en curso'], 200);
        } else {
            return response()->json(['message' => 'Estudiante o curso no encontrado'], 404);
        }
    }

    public function removeStudentFromCourse(Request $request, $studentId, $courseId)
    {
        $student = Student::find($studentId);
        $course = Course::find($courseId);

        if ($student && $course) {
            // Verificar si el estudiante está inscrito en el curso
            if (!$student->courses()->where('course_id', $course->id)->exists()) {
                return response()->json(['message' => 'Student not enrolled in course'], 400);
            }

            // Eliminar la relación entre el estudiante y el curso
            $student->courses()->detach($course);

            return response()->json(['message' => 'Student removed from course'], 200);
        } else {
            return response()->json(['message' => 'Student or course not found'], 404);
        }
    }
}
