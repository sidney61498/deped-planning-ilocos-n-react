<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use JWTFactory;
use JWTAuth;
use App\User;
use Illuminate\Support\Facades\Auth;
use App\Rules\url;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'string','max:255'],
            'password'=> 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(),400);
        }
        $credentials = $request->only('username', 'password');
        try {
            $user = User::where('username', $request->get('username'))->first();
            if (! $token = JWTAuth::attempt($credentials, (empty($user) ? [] : $user->toArray()) )) {
                return response()->json(['username'=>'Invalid credentials'], 401);
            }
        } catch (JWTException $e) {
            return response()->json(['username'=>'Could not create token'], 500);
        }
        return response()->json(['token'=>$token, 'user'=>auth()->user()]);
    }

    
}