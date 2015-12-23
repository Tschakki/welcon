<?php include_once("header.php") ?>

<output>
<h1Body>PHP ECHO OF POST REQUEST:</h1Body>
<br>
<table border="1" cellpadding="2" cellspacing="0" width="100%">
<?php
foreach ($_POST as $key => $value)
print("<tr><td bgcolor=\"#eeeeff\">
<strong>$key</strong></td>
<td>$value</td></tr>");
?>
</table>
</output>

<?php include_once("footer.php") ?>