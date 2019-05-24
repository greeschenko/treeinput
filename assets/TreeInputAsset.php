<?php

namespace greeschenko\treeinput\assets;

use yii\web\AssetBundle;

class TreeInputAsset extends AssetBundle
{
    public $sourcePath = '@vendor/greeschenko/treeinput/web';
    public $css = [
        'css/treeinput.min.css?v=0.0.1',
    ];
    public $js = [
        'js/treeinput.min.js?v=0.0.5',
    ];
    public $depends = [
        'yii\web\JqueryAsset',
        'greeschenko\sysmsgs\assets\FontsAsset',
        'greeschenko\sysmsgs\assets\HatajsAsset',
    ];
}
