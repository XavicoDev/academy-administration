<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;

class studentController extends Controller
{
    public function index()
    {
        $students = Student::all();
        $data = [
            'students' => $students,
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    public function show($id)
    {
        $student = Student::find($id);

        if (!$student) {
            $data = [
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'student' => $student,
            'status' => 200
        ];

        return response()->json($data, 200);
    }
    
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'age' => 'required',
            'ci' => 'required',
            'mail' => 'required|email|unique:student'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $student = Student::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'age' => $request->age,
            'ci' => $request->ci,
            'mail' => $request->mail
        ]);

        if (!$student) {
            $data = [
                'message' => 'Error al crear el estudiante',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'student' => $student,
            'status' => 201
        ];

        return response()->json($data, 201);

    }

    public function destroy($id)
    {
        $student = Student::find($id);

        if (!$student) {
            $data = [
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        
        $student->delete();

        $data = [
            'message' => 'Estudiante eliminado',
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function update(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            $data = [
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'age' => 'required',
            'ci' => 'required',
            'mail' => 'required|email|unique:student'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $student->first_name = $request->first_name;
        $student->last_name = $request->last_name;
        $student->age = $request->age;
        $student->ci = $request->ci;
        $student->mail = $request->mail;

        $student->save();

        $data = [
            'message' => 'Estudiante actualizado',
            'student' => $student,
            'status' => 200
        ];

        return response()->json($data, 200);

    }

    public function updatePartial(Request $request, $id)
    {
        $student = Student::find($id);

        if (!$student) {
            $data = [
                'message' => 'Estudiante no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'mail' => 'email|unique:student'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        if ($request->has('first_name')) {
            $student->first_name = $request->first_name;
        }

        if ($request->has('last_name')) {
            $student->last_name = $request->last_name;
        }

        if ($request->has('age')) {
            $student->age = $request->age;
        }

        if ($request->has('ci')) {
            $student->ci = $request->ci;
        }

        if ($request->has('mail')) {
            $student->ci = $request->mail;
        }

        $student->save();

        $data = [
            'message' => 'Estudiante actualizado',
            'student' => $student,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

}
