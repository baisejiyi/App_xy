<?php
	header("Content-type:text/html;charset=utf-8");
	date_default_timezone_set("PRC");
//	连接数据库
	$mysqli = new mysqli("localhost","root","","test");
	if ($mysqli->connect_errno) {
		die($mysqli->connect_error);
	}
	$mysqli->query("set names utf8");
//	获取数据
	$playerName = $_GET["playerName"];
	$headImg = $_GET["headImg"];
	$scoreSum = $_GET["scoreSum"];
//	插入数据
	$sql = "INSERT INTO player VALUES (null,'{$playerName}','{$headImg}','{$scoreSum}')";
	$result = $mysqli->query($sql);
	if($result){
//		如果插入成功，就查询以分数来排序的前五名的玩家
		$sql = "SELECT * FROM player ORDER BY score_sum DESC LIMIT 0,5";
		$result = $mysqli->query($sql);
		if($result->num_rows){
			$infoArr = [];
			while ($row = $result->fetch_assoc()) {
				$infoArr[] = $row;
			}
		}
	}
	echo json_encode($infoArr);
?>