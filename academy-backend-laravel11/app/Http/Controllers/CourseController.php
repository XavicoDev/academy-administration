<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $courses = Course::all();
        // return view('courses.index', compact('courses'));

        $courses = Course::all();
        $data = [
            'data' => $courses,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function create()
    {
        return view('courses.create');
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|max:50',
            'schedule' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'type' => 'required|in:Presencial,Virtual',
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $student = Course::create([
            'name' => $request->name,
            'schedule' => $request->schedule,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'type' => $request->type
        ]);

        if (!$student) {
            $data = [
                'message' => 'Error al crear el estudiante',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'data' => $student,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    public function show($id)
    {
        $course = Course::findOrFail($id);
        return view('courses.show', compact('course'));
    }

    public function edit($id)
    {
        $course = Course::findOrFail($id);
        return view('courses.edit', compact('course'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|max:50',
            'schedule' => 'required',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'type' => 'required|in:Presencial,Virtual',
        ]);

        $course = Course::findOrFail($id);
        $course->update($request->all());
        return redirect()->route('courses.index')->with('success', 'Curso actualizado exitosamente');
    }

    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();
        return redirect()->route('courses.index')->with('success', 'Curso eliminado exitosamente');
    }
}
