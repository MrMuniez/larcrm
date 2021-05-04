<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\RepairState;
use App\Models\ItemType;
use App\Models\OrderRepair;
use App\Models\Client;
use App\Models\OrderItem;

class Order extends Model
{
    use HasFactory;

    protected $with=['state','type','repairs','items','client'];
    protected $guarded = ['id'];

    function state(){
        return $this->hasOne(RepairState::class,'id','repair_state_id');
    }
    function type(){
        return $this->hasOne(ItemType::class,'id','item_type_id');
    }
    function repairs(){
        return $this->hasMany(OrderRepair::class);
    }
    function items(){
        return $this->hasMany(OrderItem::class);
    }

    function client(){
        return $this->belongsTo(Client::class,'client_id','id');
    }

    function delete(){
        $this->repairs()->delete();
        $this->items()->delete();
        parent::delete();
    }
}
