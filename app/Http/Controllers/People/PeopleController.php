<?php

namespace App\Http\Controllers\People;

use App\Http\Controllers\Controller;
use App\Models\People;
use Illuminate\Http\Request;

class PeopleController extends Controller
{
    public function getPeopleRecord()
    {
        $result = People::all()->map(function ($item) {
            $item->interests = json_decode($item->interests);
            return $item;
        });

        if ($result) {
            return response()->json([
                'status'  => '200',
                'message' => 'People record fetched successfully',
                'record'  => $result,
            ]);
        } else {
            return response()->json([
                'status'  => '500',
                'message' => 'People record not found!',
            ]);
        }
    }

    public function storePeopleRecord(Request $request)
    {
        $request->merge(['interests' => json_encode($request->interests)]);
        $record = People::create($request->all());

        if ($record) {
            return response()->json([
                'status'  => '200',
                'message' => 'People record created successfully',
                'record'  => $record,
            ]);
        } else {
            return response()->json([
                'status'  => '500',
                'message' => 'Record not created!',
            ]);
        }
    }

    public function deletePeopleRecord($id)
    {
        $record = People::find($id);
        if (!$record) {
            return response()->json([
                'status'  => '404',
                'message' => 'People record not found!',
            ]);
        }

        $record->delete();
        return response()->json([
            'status'  => '200',
            'message' => 'People record deleted successfully',
        ]);
    }

    public function updatePeopleRecord(Request $request)
    {
        $record = People::find($request->id);
        if (!$record) {
            return response()->json([
                'status'  => '404',
                'message' => 'People record not found!',
            ]);
        }

        $request->merge(['interests' => json_encode($request->interests)]);
        $record->update($request->all());

        return response()->json([
            'status'  => '200',
            'message' => 'People record updated successfully',
        ]);
    }
}
