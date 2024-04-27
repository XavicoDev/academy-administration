<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminLoginController extends Controller
{
    public function showLoginForm()
    {
        return view('auth.admin-login');
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::guard('administrators')->attempt($credentials)) {
            $user = Auth::guard('administrators')->user();
            $token = $user->createToken('Personal Access Token')->accessToken;
            return response()->json([
                'message' => 'Login successful',
                'access_token' => $token,
            ]);
        }
    
        return response()->json([
            'message' => 'Invalid credentials',
        ], 401);
    }

    public function logout()
    {
        Auth::guard('administrators')->logout();
        return redirect('/');
    }
}
