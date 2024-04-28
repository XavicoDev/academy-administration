<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Support\Facades\DB;
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
            if (!$student->courses()->where('course_id', $course->id)->exists()) {
                return response()->json(['message' => 'Student not enrolled in course'], 400);
            }
            $student->courses()->detach($course);

            return response()->json(['message' => 'Student removed from course'], 200);
        } else {
            return response()->json(['message' => 'Student or course not found'], 404);
        }
    }

    public function topCoursesWithMostStudents(Request $request)
    {
        // Consulta para obtener los top 3 cursos con más estudiantes en los últimos 6 meses
        $topCourses = Course::select('courses.*', DB::raw('COUNT(course_student.student_id) as student_count'))
            ->join('course_student', 'courses.id', '=', 'course_student.course_id')
            ->where('courses.end_date', '>=', now()->subMonths(6)) // Filtrar cursos con end_date en los últimos 6 meses
            ->groupBy('courses.id')
            ->orderByDesc('student_count')
            ->limit(3)
            ->get();

        return response()->json($topCourses, 200);
    }


    public function topStudentsWithMostCourses(Request $request)
    {
        // Consulta para obtener los top 3 estudiantes con más cursos
        $topStudents = Student::select('student.*', DB::raw('COUNT(course_student.course_id) as course_count'))
            ->join('course_student', 'student.id', '=', 'course_student.student_id')
            ->groupBy('student.id')
            ->orderByDesc('course_count')
            ->limit(3)
            ->get();

        return response()->json($topStudents, 200);
    }

    public function totalCourses(Request $request)
    {
        // Consulta para obtener el total de cursos
        $totalCourses = Course::count();

        return response()->json(['total_courses' => $totalCourses], 200);
    }

    public function totalStudents(Request $request)
    {
        // Consulta para obtener el total de estudiantes
        $totalStudents = Student::count();

        return response()->json(['total_students' => $totalStudents], 200);
    }
}
