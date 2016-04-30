<template>
  <article class="notification is-danger">
    <div class="content">
      <p class="title">Child Component</p>
      <ul>
        <li>
          <code>$lang('color')</code>
          <P>&#8618; {{ $lang('color') }}</P>
        </li>
        <li>
          <code>$lang('name.first')</code>
          <P>&#8618; {{ $lang('name.first') }}</P>
        </li>
        <li>
          <code>$lang('price', {price:10})</code>
          <P>&#8618; {{ $lang('price', {price:10}) }}</P>
        </li>
      </ul>
      <pre>{{ $options.locales | json }}</pre>
    </div>
  </article>
</template>

<script>
export default {
  locales: {
    en: {
      color: 'Red',
      price: 'Price: {price}$'
    },
    el: {
      color: 'Κόκκινο',
      price: 'Τιμή: {price}€'
    }
  }
}
</script>
