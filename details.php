<h1Body>Details</h1Body>
<output>
<table border="1" cellpadding="2" cellspacing="0" width="100%">
<?php
foreach ($_POST as $key => $value)
print("<tr><td bgcolor=\"#bbbbbb\">
<strong>$key</strong></td>
<td>$value</td></tr>");
?>
</table>
</output>