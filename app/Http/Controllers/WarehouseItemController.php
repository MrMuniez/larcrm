<?php

namespace App\Http\Controllers;

use App\Models\WarehouseItems;
use Illuminate\Http\Request;

class WarehouseItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return WarehouseItems::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $w = new WarehouseItems();
        $w->fill($request->all());
        $w->save();
        return $w;

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return WarehouseItems::where('id',$id)->first();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $w = WarehouseItems::where('id',$id)->first();
        return $w->update($request->all());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $w = WarehouseItems::where('id',$id)->first();
        return $w->destroy();
    }

    function find(Request $request){
        return WarehouseItems::where('name','like','%'.$request->input('q').'%')->get();
    }
}
